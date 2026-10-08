import { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, LogOut, Image, FileText, Layers, Mail, Plus, Edit2, Trash2, Eye, EyeOff, Save, CheckCircle2, AlertCircle, Upload, ExternalLink, RefreshCw, Sparkles, Building2, Phone, MapPin, Globe, Check
} from 'lucide-react';
import api from '../api/axios';
import { useCompany } from '../context/CompanyContext';

const AdminPortal = () => {
  const { company, refreshCompany } = useCompany();

  // Auth State
  const [username, setUsername] = useState('Bigbadmin');
  const [password, setPassword] = useState('Bigb@admin123');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Tab State: 'content' | 'gallery' | 'facilities' | 'enquiries'
  const [activeTab, setActiveTab] = useState('content');

  // Status notification state
  const [toast, setToast] = useState(null);

  // --- CONTENT EDITING STATE ---
  const [companyForm, setCompanyForm] = useState({
    name: '',
    tagline: '',
    description: '',
    hero_title: '',
    hero_subtitle: '',
    about_text: '',
    phone: '',
    email: '',
    whatsapp: '',
    address: '',
    google_maps_url: '',
  });
  const [savingContent, setSavingContent] = useState(false);

  // --- GALLERY STATE ---
  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('All');
  
  // New Image Modal / Form State
  const [showAddImageModal, setShowAddImageModal] = useState(false);
  const [newImage, setNewImage] = useState({
    title: '',
    category: 'Warehouse',
    description: '',
    image_url: '',
    image_file: null,
    is_active: true,
  });
  const [imagePreview, setImagePreview] = useState('');

  // --- FACILITIES STATE ---
  const [facilities, setFacilities] = useState([]);
  const [loadingFacilities, setLoadingFacilities] = useState(false);
  const [showAddFacilityModal, setShowAddFacilityModal] = useState(false);
  const [newFacility, setNewFacility] = useState({
    title: '',
    description: '',
    icon: 'Warehouse',
    image_url: '',
    image_file: null,
    is_active: true,
  });

  // --- ENQUIRIES STATE ---
  const [enquiries, setEnquiries] = useState([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);

  // Helper for notification toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Check existing login session on mount
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await api.get('/auth/me/');
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (err) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          delete api.defaults.headers.common['Authorization'];
          setIsAuthenticated(false);
        }
      }
    };
    checkSession();
  }, []);

  // Sync company data to content edit form when loaded
  useEffect(() => {
    if (company) {
      setCompanyForm({
        name: company.name || '',
        tagline: company.tagline || '',
        description: company.description || '',
        hero_title: company.hero_title || '',
        hero_subtitle: company.hero_subtitle || '',
        about_text: company.about_text || '',
        phone: company.phone || '',
        email: company.email || '',
        whatsapp: company.whatsapp || '',
        address: company.address || '',
        google_maps_url: company.google_maps_url || '',
      });
    }
  }, [company]);

  const fetchCompanyContent = async () => {
    try {
      const res = await api.get('/company/');
      const data = Array.isArray(res.data) ? res.data[0] : (res.data?.results?.[0] || res.data);
      if (data) {
        setCompanyForm({
          name: data.name || '',
          tagline: data.tagline || '',
          description: data.description || '',
          hero_title: data.hero_title || '',
          hero_subtitle: data.hero_subtitle || '',
          about_text: data.about_text || '',
          phone: data.phone || '',
          email: data.email || '',
          whatsapp: data.whatsapp || '',
          address: data.address || '',
          google_maps_url: data.google_maps_url || '',
        });
      }
    } catch (err) {
      console.error('Failed to load company content:', err);
    }
  };

  // Load Gallery, Facilities, Enquiries & Company once logged in
  useEffect(() => {
    if (isAuthenticated) {
      if (refreshCompany) refreshCompany();
      fetchCompanyContent();
      fetchGallery();
      fetchFacilities();
      fetchEnquiries();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const cleanUser = username.trim();
      const cleanPass = password.trim();
      const res = await api.post('/auth/login/', { username: cleanUser, password: cleanPass });
      const token = res.data.access;
      const refresh = res.data.refresh;

      localStorage.setItem('access_token', token);
      localStorage.setItem('refresh_token', refresh);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      let userData = { username: cleanUser };
      try {
        const userRes = await api.get('/auth/me/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        userData = userRes.data;
      } catch (meErr) {
        console.warn('Could not fetch user details from /auth/me/:', meErr);
      }

      setUser(userData);
      setIsAuthenticated(true);
      showToast('Welcome back, Admin!');
    } catch (err) {
      console.error('Login error:', err);
      const detail = err.response?.data?.detail;
      const nonField = err.response?.data?.non_field_errors?.[0];
      const message = detail || nonField || 'Invalid credentials. Please double check admin username and password.';
      setAuthError(message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setUser(null);
    showToast('Logged out of Admin Portal');
  };

  // --- CONTENT SAVE HANDLER ---
  const handleSaveCompanyContent = async (e) => {
    e.preventDefault();
    setSavingContent(true);
    try {
      if (company && company.id) {
        await api.patch(`/company/${company.id}/`, companyForm);
      } else {
        await api.post('/company/', companyForm);
      }
      if (refreshCompany) await refreshCompany();
      showToast('Website Content & Words Updated Successfully!');
    } catch (err) {
      showToast('Failed to save website content.', 'error');
    } finally {
      setSavingContent(false);
    }
  };

  // --- GALLERY HANDLERS ---
  const fetchGallery = async () => {
    setLoadingGallery(true);
    try {
      const res = await api.get('/gallery/');
      const list = Array.isArray(res.data) ? res.data : (res.data?.results || []);
      setGalleryImages(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingGallery(false);
    }
  };

  const handleCreateImage = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newImage.title);
      formData.append('category', newImage.category);
      formData.append('description', newImage.description);
      formData.append('is_active', newImage.is_active);
      if (newImage.image_file) {
        formData.append('image', newImage.image_file);
      }
      if (newImage.image_url) {
        formData.append('image_url', newImage.image_url);
      }

      await api.post('/gallery/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setShowAddImageModal(false);
      setNewImage({
        title: '',
        category: 'Warehouse',
        description: '',
        image_url: '',
        image_file: null,
        is_active: true,
      });
      setImagePreview('');
      fetchGallery();
      showToast('New image uploaded successfully!');
    } catch (err) {
      showToast('Failed to upload image.', 'error');
    }
  };

  const handleToggleGalleryActive = async (image) => {
    try {
      await api.patch(`/gallery/${image.id}/`, { is_active: !image.is_active });
      fetchGallery();
      showToast(`Image visibility ${!image.is_active ? 'enabled' : 'hidden'}`);
    } catch (err) {
      showToast('Failed to update image visibility.', 'error');
    }
  };

  const handleDeleteGalleryImage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery picture?')) return;
    try {
      await api.delete(`/gallery/${id}/`);
      fetchGallery();
      showToast('Picture deleted from gallery.');
    } catch (err) {
      showToast('Failed to delete picture.', 'error');
    }
  };

  // --- FACILITIES HANDLERS ---
  const fetchFacilities = async () => {
    setLoadingFacilities(true);
    try {
      const res = await api.get('/facilities/');
      const list = Array.isArray(res.data) ? res.data : (res.data?.results || []);
      setFacilities(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingFacilities(false);
    }
  };

  const handleCreateFacility = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newFacility.title);
      formData.append('description', newFacility.description);
      formData.append('icon', newFacility.icon);
      formData.append('is_active', newFacility.is_active);
      if (newFacility.image_file) {
        formData.append('image', newFacility.image_file);
      }
      if (newFacility.image_url) {
        formData.append('image_url', newFacility.image_url);
      }

      await api.post('/facilities/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setShowAddFacilityModal(false);
      setNewFacility({
        title: '',
        description: '',
        icon: 'Warehouse',
        image_url: '',
        image_file: null,
        is_active: true,
      });
      fetchFacilities();
      showToast('New facility feature added!');
    } catch (err) {
      showToast('Failed to add facility feature.', 'error');
    }
  };

  const handleToggleFacilityActive = async (facility) => {
    try {
      await api.patch(`/facilities/${facility.id}/`, { is_active: !facility.is_active });
      fetchFacilities();
      showToast(`Facility status updated.`);
    } catch (err) {
      showToast('Failed to toggle facility status.', 'error');
    }
  };

  const handleDeleteFacility = async (id) => {
    if (!window.confirm('Are you sure you want to delete this facility feature?')) return;
    try {
      await api.delete(`/facilities/${id}/`);
      fetchFacilities();
      showToast('Facility feature deleted.');
    } catch (err) {
      showToast('Failed to delete facility.', 'error');
    }
  };

  // --- ENQUIRIES HANDLERS ---
  const fetchEnquiries = async () => {
    setLoadingEnquiries(true);
    try {
      const res = await api.get('/enquiries/');
      const list = Array.isArray(res.data) ? res.data : (res.data?.results || []);
      setEnquiries(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  const handleToggleEnquiryStatus = async (enquiry) => {
    const nextStatus = enquiry.status === 'VERIFIED' ? 'NEW' : 'VERIFIED';
    try {
      await api.patch(`/enquiries/${enquiry.id}/`, { status: nextStatus });
      fetchEnquiries();
      showToast(nextStatus === 'VERIFIED' ? 'Enquiry marked as Verified.' : 'Enquiry marked as New.');
    } catch (err) {
      showToast('Failed to update enquiry status.', 'error');
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this enquiry? This action cannot be undone.')) return;
    try {
      await api.delete(`/enquiries/${id}/`);
      fetchEnquiries();
      showToast('Enquiry deleted successfully.');
    } catch (err) {
      showToast('Failed to delete enquiry.', 'error');
    }
  };

  // --- LOGIN SCREEN IF NOT AUTHENTICATED ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden blueprint-grid-pattern">
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none"></div>

        {/* Login Card */}
        <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl backdrop-blur-md relative z-10 overflow-hidden">
          {/* Top Orange Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-orange-500 to-amber-500"></div>

          {/* Clean BigB Logo */}
          <div className="flex flex-col items-center text-center mb-8 select-none">
            <div className="flex items-baseline font-black leading-none mb-2">
              <span className="text-6xl sm:text-7xl tracking-tighter text-slate-900 font-extrabold">
                BIG
              </span>
              <span className="text-6xl sm:text-7xl text-brand-orange tracking-tighter animate-logo-b ml-[2px] font-extrabold">
                B
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-6 bg-brand-orange rounded-full"></div>
              <span className="text-xs font-mono font-bold tracking-widest text-brand-orange uppercase">
                ADMIN CONTROL PORTAL
              </span>
              <div className="h-0.5 w-6 bg-brand-orange rounded-full"></div>
            </div>

            <p className="text-xs text-slate-500 font-medium mt-3">
              Enter your master administrator credentials to access full site controls.
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-mono flex items-start gap-3 shadow-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
              <div>{authError}</div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-2 tracking-wider flex items-center justify-between">
                <span>ADMIN USERNAME</span>
                <span className="text-brand-orange text-[10px]">REQUIRED</span>
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Bigbadmin"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all font-mono text-sm shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-2 tracking-wider flex items-center justify-between">
                <span>PASSWORD</span>
                <span className="text-brand-orange text-[10px]">SECURED</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-11 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all font-mono text-sm shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer focus:outline-none"
                  title={showPassword ? "Hide password" : "Show password"}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-brand-orange" />
                  ) : (
                    <Eye className="w-4 h-4 text-slate-500" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="cta-light-sweep w-full bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-600 hover:to-brand-orange text-white font-black py-4 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/25 border border-orange-400/40 text-sm mt-2 cursor-pointer active:scale-[0.99]"
            >
              {authLoading ? (
                <>VERIFYING CREDENTIALS...</>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-white" /> UNLOCK ADMIN PORTAL
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- AUTHENTICATED ADMIN DASHBOARD ---
  const filteredGallery = galleryCategoryFilter === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === galleryCategoryFilter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-orange selection:text-white">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-xl border flex items-center gap-3 font-mono text-sm uppercase backdrop-blur-xl animate-fade-in ${
          toast.type === 'error' ? 'bg-white border-red-500 text-red-700 shadow-red-500/10' : 'bg-white border-brand-orange text-slate-900 shadow-brand-orange/10'
        }`}>
          {toast.type === 'error' ? <AlertCircle className="w-5 h-5 text-red-500 shrink-0" /> : <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      {/* Top Accent Line */}
      <div className="h-1.5 bg-gradient-to-r from-brand-orange via-orange-500 to-amber-500 w-full"></div>

      {/* Admin Header with White Theme */}
      <header className="bg-white/95 border-b border-slate-200/90 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col select-none">
              <div className="flex items-baseline font-black leading-none">
                <span className="text-3xl tracking-tighter text-slate-900 font-extrabold">
                  BIG
                </span>
                <span className="text-3xl text-brand-orange tracking-tighter animate-logo-b ml-[1px] font-extrabold">
                  B
                </span>
              </div>
              <span className="text-[0.6rem] font-mono font-bold tracking-widest text-brand-orange uppercase">
                ADMIN PORTAL
              </span>
            </div>
          </div>

          {/* User Info & Quick Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right mr-2 font-mono">
              <span className="text-xs text-slate-400 font-medium">ADMIN USER</span>
              <span className="text-sm font-bold text-brand-orange">{user?.username || 'Bigbadmin'}</span>
            </div>

            <a
              href="http://127.0.0.1:8000/admin/"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-brand-orange px-4 py-2.5 rounded-xl font-mono text-xs uppercase border border-slate-200 transition-all shadow-sm"
            >
              DJANGO BACKEND <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 hover:text-red-700 px-4 py-2.5 rounded-xl text-xs font-mono uppercase font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer active:scale-95"
            >
              <LogOut className="w-4 h-4" /> LOG OUT
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center justify-center gap-2.5 p-4 rounded-2xl font-mono text-xs uppercase font-bold transition-all cursor-pointer shadow-sm ${
              activeTab === 'content'
                ? 'bg-brand-orange text-white border border-orange-400 shadow-md shadow-brand-orange/20 scale-[1.01]'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:text-brand-orange hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>EDIT SITE WORDS</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center justify-center gap-2.5 p-4 rounded-2xl font-mono text-xs uppercase font-bold transition-all cursor-pointer shadow-sm ${
              activeTab === 'gallery'
                ? 'bg-brand-orange text-white border border-orange-400 shadow-md shadow-brand-orange/20 scale-[1.01]'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:text-brand-orange hover:bg-slate-50'
            }`}
          >
            <Image className="w-4 h-4 shrink-0" />
            <span>GALLERY ({galleryImages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('facilities')}
            className={`flex items-center justify-center gap-2.5 p-4 rounded-2xl font-mono text-xs uppercase font-bold transition-all cursor-pointer shadow-sm ${
              activeTab === 'facilities'
                ? 'bg-brand-orange text-white border border-orange-400 shadow-md shadow-brand-orange/20 scale-[1.01]'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:text-brand-orange hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>FACILITIES ({facilities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`flex items-center justify-center gap-2.5 p-4 rounded-2xl font-mono text-xs uppercase font-bold transition-all cursor-pointer shadow-sm ${
              activeTab === 'enquiries'
                ? 'bg-brand-orange text-white border border-orange-400 shadow-md shadow-brand-orange/20 scale-[1.01]'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:text-brand-orange hover:bg-slate-50'
            }`}
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span>ENQUIRIES ({enquiries.length})</span>
          </button>
        </div>

        {/* --- TAB 1: EDIT WEBSITE WORDS & CONTENT --- */}
        {activeTab === 'content' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
              <div>
                <h2 className="text-3xl font-black uppercase text-slate-900 tracking-tight mt-1">EDIT WEBSITE WORDS & TEXT</h2>
                <p className="text-xs font-mono text-slate-500 mt-1">Updates saved here immediately change headlines, paragraphs, and contact numbers across all pages.</p>
              </div>

              <button
                onClick={handleSaveCompanyContent}
                disabled={savingContent}
                className="cta-light-sweep bg-brand-orange hover:bg-orange-600 text-white font-black px-8 py-4 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 text-xs shadow-md border border-orange-400 cursor-pointer transition-all active:scale-95"
              >
                <Save className="w-4 h-4" /> {savingContent ? 'SAVING...' : 'SAVE ALL CHANGES'}
              </button>
            </div>

            <form onSubmit={handleSaveCompanyContent} className="space-y-8">
              {/* Homepage Hero Section Words */}
              <div className="bg-slate-50/80 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-5">
                <div className="flex items-center gap-2 text-brand-orange font-mono text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-4 h-4" /> HOMEPAGE HERO BANNER WORDS
                </div>
                
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">MAIN HERO HEADLINE</label>
                  <input
                    type="text"
                    value={companyForm.hero_title}
                    onChange={(e) => setCompanyForm({ ...companyForm, hero_title: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-4 text-slate-900 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-sm font-bold shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">HERO SUBTITLE / PARAGRAPH</label>
                  <textarea
                    rows={3}
                    value={companyForm.hero_subtitle}
                    onChange={(e) => setCompanyForm({ ...companyForm, hero_subtitle: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-4 text-slate-900 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-sm leading-relaxed shadow-sm"
                  />
                </div>
              </div>

              {/* About & Tagline Words */}
              <div className="bg-slate-50/80 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-5">
                <div className="flex items-center gap-2 text-brand-orange font-mono text-xs font-bold uppercase tracking-wider">
                  <FileText className="w-4 h-4" /> ABOUT SECTION & TAGLINE WORDS
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">COMPANY TAGLINE</label>
                  <input
                    type="text"
                    value={companyForm.tagline}
                    onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-4 text-slate-900 focus:border-brand-orange focus:outline-none text-sm font-bold shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">ABOUT PAGE PARAGRAPH</label>
                  <textarea
                    rows={4}
                    value={companyForm.about_text}
                    onChange={(e) => setCompanyForm({ ...companyForm, about_text: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-4 text-slate-900 focus:border-brand-orange focus:outline-none text-sm leading-relaxed shadow-sm"
                  />
                </div>
              </div>

              {/* Contact Information Words */}
              <div className="bg-slate-50/80 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-5">
                <div className="flex items-center gap-2 text-brand-orange font-mono text-xs font-bold uppercase tracking-wider">
                  <Phone className="w-4 h-4" /> CONTACT & LOCATION DETAILS
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">PHONE NUMBER</label>
                    <input
                      type="text"
                      value={companyForm.phone}
                      onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-4 text-slate-900 focus:border-brand-orange focus:outline-none font-mono text-sm shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      value={companyForm.email}
                      onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-4 text-slate-900 focus:border-brand-orange focus:outline-none font-mono text-sm shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">WHATSAPP NUMBER</label>
                    <input
                      type="text"
                      value={companyForm.whatsapp}
                      onChange={(e) => setCompanyForm({ ...companyForm, whatsapp: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-4 text-slate-900 focus:border-brand-orange focus:outline-none font-mono text-sm shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">PHYSICAL ADDRESS</label>
                  <textarea
                    rows={2}
                    value={companyForm.address}
                    onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-4 text-slate-900 focus:border-brand-orange focus:outline-none text-sm leading-relaxed shadow-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={savingContent}
                  className="cta-light-sweep bg-brand-orange hover:bg-orange-600 text-white font-black px-10 py-5 rounded-2xl uppercase tracking-wider flex items-center gap-3 text-sm shadow-md border border-orange-400 cursor-pointer active:scale-95"
                >
                  <Save className="w-5 h-5" /> {savingContent ? 'SAVING CHANGES...' : 'SAVE ALL WEBSITE WORDS'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- TAB 2: GALLERY & PICTURE MANAGER --- */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-bold">VISUAL MEDIA MANAGEMENT</span>
                <h2 className="text-3xl font-black uppercase text-slate-900 tracking-tight mt-1">WEBSITE GALLERY & PICTURES</h2>
                <p className="text-xs font-mono text-slate-500 mt-1">Upload pictures or change images for any section of the website.</p>
              </div>

              <button
                onClick={() => setShowAddImageModal(true)}
                className="cta-light-sweep bg-brand-orange hover:bg-orange-600 text-white font-black px-6 py-3.5 rounded-xl uppercase tracking-wider flex items-center gap-2 text-xs shadow-md border border-orange-400 cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" /> ADD NEW PICTURE
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2.5">
              {['All', 'Warehouse', 'Loading', 'Parking', 'Facilities', 'Hero', 'About', 'General'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryCategoryFilter(cat)}
                  className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase transition-all cursor-pointer ${
                    galleryCategoryFilter === cat
                      ? 'bg-brand-orange text-white font-bold border border-orange-400 shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:text-brand-orange hover:bg-slate-50 shadow-sm'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            {loadingGallery ? (
              <div className="text-center py-20 font-mono text-brand-orange text-lg">LOADING PICTURES...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGallery.map((img) => (
                  <div
                    key={img.id}
                    className={`bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                      img.is_active ? 'border-slate-200 hover:border-brand-orange/60' : 'border-red-200 opacity-60'
                    }`}
                  >
                    <div className="relative aspect-video bg-slate-100">
                      <img
                        src={img.image_display || img.image || img.image_url}
                        alt={img.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-mono font-bold text-brand-orange border border-slate-200 uppercase shadow-sm">
                        {img.category}
                      </div>
                      <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase shadow-sm ${
                        img.is_active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {img.is_active ? 'VISIBLE' : 'HIDDEN'}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-bold text-slate-900 uppercase text-base tracking-wide">{img.title}</h3>
                        {img.description && (
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">{img.description}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-2">
                        <button
                          onClick={() => handleToggleGalleryActive(img)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
                            img.is_active
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {img.is_active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          {img.is_active ? 'HIDE' : 'SHOW'}
                        </button>

                        <button
                          onClick={() => handleDeleteGalleryImage(img.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 p-2.5 rounded-xl transition-all cursor-pointer active:scale-95"
                          title="Delete Picture"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 3: FACILITIES MANAGER --- */}
        {activeTab === 'facilities' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex items-center justify-between shadow-sm">
              <div>
                <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-bold">INFRASTRUCTURE SPECS</span>
                <h2 className="text-3xl font-black uppercase text-slate-900 tracking-tight mt-1">FACILITIES & FEATURES MANAGER</h2>
                <p className="text-xs font-mono text-slate-500 mt-1">Manage warehouse features, weighbridge specs, and facility details.</p>
              </div>

              <button
                onClick={() => setShowAddFacilityModal(true)}
                className="cta-light-sweep bg-brand-orange hover:bg-orange-600 text-white font-black px-6 py-3.5 rounded-xl uppercase tracking-wider flex items-center gap-2 text-xs shadow-md border border-orange-400 cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" /> ADD NEW FACILITY
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {facilities.map((fac) => (
                <div key={fac.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    {fac.image_display || fac.image || fac.image_url ? (
                      <img src={fac.image_display || fac.image || fac.image_url} alt={fac.title} className="w-24 h-24 object-cover rounded-xl border border-slate-200 shadow-sm shrink-0" />
                    ) : (
                      <div className="w-24 h-24 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center text-brand-orange shrink-0">
                        <Layers className="w-10 h-10" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 text-lg uppercase tracking-wide">{fac.title}</h3>
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase shadow-sm ${
                          fac.is_active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {fac.is_active ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">{fac.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => handleToggleFacilityActive(fac)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-mono uppercase cursor-pointer border border-slate-200 transition-colors"
                    >
                      TOGGLE STATUS
                    </button>
                    <button
                      onClick={() => handleDeleteFacility(fac.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-xl border border-red-200 cursor-pointer active:scale-95 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 4: CLIENT ENQUIRIES VIEWER --- */}
        {activeTab === 'enquiries' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-bold">CLIENT COMMUNICATIONS</span>
                <h2 className="text-3xl font-black uppercase text-slate-900 tracking-tight mt-1">CLIENT ENQUIRIES & MESSAGES</h2>
                <p className="text-xs font-mono text-slate-500 mt-1">Review, verify and manage inquiry submissions received from the contact form.</p>
              </div>
              <button
                onClick={fetchEnquiries}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer self-start sm:self-auto shadow-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingEnquiries ? 'animate-spin' : ''}`} /> REFRESH LIST
              </button>
            </div>

            {loadingEnquiries ? (
              <div className="text-center py-16 font-mono text-brand-orange text-lg">LOADING MESSAGES...</div>
            ) : enquiries.length === 0 ? (
              <div className="text-center py-20 px-4 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
                <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center mx-auto mb-3 shadow-sm text-slate-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="font-bold text-slate-700 text-sm uppercase tracking-wider">No Client Enquiries Yet</div>
                <p className="text-xs font-mono text-slate-400 mt-1 max-w-md mx-auto">
                  Direct inquiries submitted through the website contact form will appear here in real-time.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enq) => {
                  const isVerified = enq.status === 'VERIFIED';
                  return (
                    <div 
                      key={enq.id} 
                      className={`border rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all ${
                        isVerified 
                          ? 'bg-emerald-50/20 border-emerald-200' 
                          : 'bg-slate-50/80 border-slate-200'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-bold text-slate-900 text-lg uppercase tracking-wide">{enq.full_name || enq.name}</span>
                          <span className="text-xs text-slate-600 font-mono font-semibold">
                            <a href={`mailto:${enq.email}`} className="hover:text-brand-orange underline decoration-slate-300">{enq.email}</a>
                            {' · '}
                            <a href={`tel:${enq.phone}`} className="hover:text-brand-orange underline decoration-slate-300">{enq.phone}</a>
                          </span>

                          {/* Status Badge */}
                          {isVerified ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> VERIFIED
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300">
                              <AlertCircle className="w-3 h-3 text-amber-600" /> PENDING REVIEW
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">{new Date(enq.created_at).toLocaleString()}</span>
                      </div>

                      {(enq.company_name || enq.requirement) && (
                        <div className="flex flex-wrap gap-2 text-xs font-mono font-bold">
                          {enq.company_name && (
                            <span className="bg-slate-200/80 text-slate-800 px-2.5 py-1 rounded-lg">
                              COMPANY: {enq.company_name}
                            </span>
                          )}
                          {enq.requirement && (
                            <span className="bg-brand-orange/10 text-brand-orange border border-brand-orange/20 px-2.5 py-1 rounded-lg">
                              REQUIREMENT: {enq.requirement}
                            </span>
                          )}
                        </div>
                      )}

                      <p className="text-sm text-slate-800 leading-relaxed bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm font-normal">
                        {enq.message ? enq.message : <span className="text-slate-400 italic">No additional message provided.</span>}
                      </p>

                      {/* Action buttons row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/70">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleEnquiryStatus(enq)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              isVerified
                                ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            {isVerified ? 'VERIFIED (CLICK TO RESET)' : 'MARK AS VERIFIED'}
                          </button>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteEnquiry(enq.id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl border border-red-200 text-xs font-mono font-bold uppercase transition-all cursor-pointer active:scale-95 shadow-sm"
                          title="Delete enquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          DELETE ENQUIRY
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- ADD NEW PICTURE MODAL --- */}
      {showAddImageModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-xl font-black uppercase text-slate-900">ADD NEW WEBSITE PICTURE</h3>
              <button onClick={() => setShowAddImageModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer text-lg">✕</button>
            </div>

            <form onSubmit={handleCreateImage} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">PICTURE TITLE</label>
                <input
                  type="text"
                  required
                  value={newImage.title}
                  onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  placeholder="e.g. Warehouse Bay 4 Exterior"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 text-sm focus:bg-white focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">CATEGORY</label>
                <select
                  value={newImage.category}
                  onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 text-sm focus:bg-white focus:border-brand-orange focus:outline-none font-mono shadow-sm"
                >
                  <option value="Warehouse">Warehouse</option>
                  <option value="Loading">Loading Docks</option>
                  <option value="Parking">Parking Yard</option>
                  <option value="Facilities">Facilities</option>
                  <option value="Hero">Hero Section</option>
                  <option value="About">About Page</option>
                  <option value="General">General Site</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">IMAGE FILE UPLOAD (OR URL BELOW)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setNewImage({ ...newImage, image_file: file });
                    if (file) setImagePreview(URL.createObjectURL(file));
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 file:bg-brand-orange file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1 file:font-mono file:text-xs shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">OR ENTER DIRECT IMAGE URL</label>
                <input
                  type="url"
                  value={newImage.image_url}
                  onChange={(e) => setNewImage({ ...newImage, image_url: e.target.value })}
                  placeholder="https://example.com/picture.jpg"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 text-sm focus:bg-white focus:border-brand-orange focus:outline-none font-mono shadow-sm"
                />
              </div>

              {imagePreview && (
                <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">DESCRIPTION / CAPTION</label>
                <textarea
                  rows={2}
                  value={newImage.description}
                  onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                  placeholder="Optional visual description..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 text-sm focus:bg-white focus:border-brand-orange focus:outline-none shadow-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddImageModal(false)}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs uppercase cursor-pointer border border-slate-200"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider border border-orange-400 shadow-md cursor-pointer transition-all active:scale-95"
                >
                  SAVE & PUBLISH PICTURE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD NEW FACILITY MODAL --- */}
      {showAddFacilityModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-xl font-black uppercase text-slate-900">ADD NEW FACILITY</h3>
              <button onClick={() => setShowAddFacilityModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer text-lg">✕</button>
            </div>

            <form onSubmit={handleCreateFacility} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">TITLE</label>
                <input
                  type="text"
                  required
                  value={newFacility.title}
                  onChange={(e) => setNewFacility({ ...newFacility, title: e.target.value })}
                  placeholder="e.g. 50-Ton Weighbridge"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 text-sm focus:bg-white focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">IMAGE FILE OR IMAGE URL</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewFacility({ ...newFacility, image_file: e.target.files[0] })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 file:bg-brand-orange file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1 file:font-mono file:text-xs mb-2 shadow-sm"
                />
                <input
                  type="url"
                  value={newFacility.image_url}
                  onChange={(e) => setNewFacility({ ...newFacility, image_url: e.target.value })}
                  placeholder="https://example.com/facility.jpg"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 text-sm focus:bg-white focus:border-brand-orange focus:outline-none font-mono shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={newFacility.description}
                  onChange={(e) => setNewFacility({ ...newFacility, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 text-sm focus:bg-white focus:border-brand-orange focus:outline-none shadow-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddFacilityModal(false)}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs uppercase cursor-pointer border border-slate-200"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider border border-orange-400 shadow-md cursor-pointer transition-all active:scale-95"
                >
                  CREATE FACILITY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
