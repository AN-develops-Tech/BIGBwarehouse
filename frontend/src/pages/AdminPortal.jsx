import { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, LogOut, Image, FileText, Layers, Mail, Plus, Edit2, Trash2, 
  Eye, EyeOff, Save, CheckCircle2, AlertCircle, Upload, ExternalLink, RefreshCw, 
  Building2, Phone, MapPin, Globe, Check, LayoutDashboard, TrendingUp, 
  Clock, ArrowUpRight, ArrowRight, Activity, Server, User, MessageSquare, 
  ChevronRight, Zap, CheckCircle, Truck, Scale
} from 'lucide-react';
import { Link } from 'react-router-dom';
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

  // Tab State: 'overview' (default exciting landing page) | 'enquiries' | 'gallery' | 'facilities' | 'content'
  const [activeTab, setActiveTab] = useState('overview');

  // Status notification state
  const [toast, setToast] = useState(null);

  // Live Clock for Overview Dashboard
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
  const refreshAllData = async () => {
    if (refreshCompany) refreshCompany();
    fetchCompanyContent();
    fetchGallery();
    fetchFacilities();
    fetchEnquiries();
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshAllData();
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
      setActiveTab('overview');
      showToast('Welcome back, Admin! Control Portal Ready.');
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

  // Quick fill default admin credentials for instant testing
  const handleQuickFillCredentials = () => {
    setUsername('Bigbadmin');
    setPassword('Bigb@admin123');
    showToast('Default Admin credentials filled!', 'info');
  };

  // --- CONTENT SAVE HANDLER ---
  const handleSaveCompanyContent = async (e) => {
    e.preventDefault();
    setSavingContent(true);
    try {
      const companyId = company?.id || 1;
      await api.patch(`/company/${companyId}/`, companyForm);
      if (refreshCompany) await refreshCompany();
      showToast('Website Content & Words Updated Successfully!');
    } catch (err) {
      try {
        await api.post('/company/', companyForm);
        if (refreshCompany) await refreshCompany();
        showToast('Website Content & Words Updated Successfully!');
      } catch (postErr) {
        showToast('Failed to save website content. Please check input values.', 'error');
      }
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

  // Calculations for Overview Dashboard metrics
  const pendingEnquiriesCount = enquiries.filter(e => e.status !== 'VERIFIED').length;
  const verifiedEnquiriesCount = enquiries.filter(e => e.status === 'VERIFIED').length;
  const activeImagesCount = galleryImages.filter(img => img.is_active).length;
  const activeFacilitiesCount = facilities.filter(f => f.is_active).length;

  // --- MINIMAL PROFESSIONAL STANDARD ADMIN LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between items-center p-4 sm:p-6 font-sans relative overflow-hidden blueprint-grid-pattern selection:bg-brand-orange selection:text-white">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none"></div>

        {/* Minimal Top Header Link */}
        <div className="w-full max-w-md flex items-center justify-between pt-2 sm:pt-4 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 hover:text-brand-orange transition-colors"
          >
            <span>← Back to Website</span>
          </Link>
        </div>

        {/* Centered Minimal Professional Login Card */}
        <div className="w-full max-w-md my-auto py-6 relative z-10">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            {/* Top Brand Orange Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-orange-500 to-amber-400"></div>

            {/* Brand Logo & Portal Header */}
            <div className="flex flex-col items-center text-center mb-7 select-none">
              <div className="flex items-baseline font-black leading-none mb-2">
                <span className="text-4xl sm:text-5xl tracking-tighter text-slate-900 font-extrabold">
                  BIG
                </span>
                <span className="text-4xl sm:text-5xl text-brand-orange tracking-tighter animate-logo-b ml-[2px] font-extrabold">
                  B
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-5 bg-brand-orange rounded-full"></div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-brand-orange uppercase">
                  ADMIN CONTROL PORTAL
                </span>
                <div className="h-0.5 w-5 bg-brand-orange rounded-full"></div>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-2">
                Sign in with master credentials to access warehouse controls.
              </p>
            </div>

            {authError && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-mono flex items-start gap-2.5 shadow-xs animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                <div className="leading-snug">{authError}</div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5 tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-orange" /> USERNAME
                  </span>
                  <span className="text-brand-orange text-[10px]">REQUIRED</span>
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Bigbadmin"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all font-mono text-sm shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5 tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-brand-orange" /> PASSWORD
                  </span>
                  <span className="text-brand-orange text-[10px]">SECURED</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-11 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all font-mono text-sm shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer focus:outline-none"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-brand-orange" />
                    ) : (
                      <Eye className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Fill Helper */}
              <div className="pt-0.5 flex justify-end">
                <button
                  type="button"
                  onClick={handleQuickFillCredentials}
                  className="text-[11px] font-mono text-slate-500 hover:text-brand-orange transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Use Default Admin Credentials</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="cta-light-sweep w-full bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-600 hover:to-brand-orange text-white font-black py-3.5 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-brand-orange/20 border border-orange-400/50 text-xs sm:text-sm mt-2 cursor-pointer active:scale-[0.99]"
              >
                {authLoading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> VERIFYING CREDENTIALS...
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> UNLOCK ADMIN PORTAL
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="w-full max-w-md pb-2 text-center text-[10px] font-mono text-slate-400 relative z-10">
          <span>Big B Warehouse Park © {new Date().getFullYear()}</span>
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

      {/* Admin Executive Header */}
      <header className="bg-white/95 border-b border-slate-200/90 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2">
          
          {/* Brand Logo & Portal Tag - Strictly routes to Overview tab in Admin Panel */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="flex items-center gap-2.5 sm:gap-3 select-none text-left cursor-pointer group focus:outline-none transition-transform active:scale-95"
              title="Return to Overview Dashboard"
            >
              <div className="flex items-baseline font-black leading-none">
                <span className="text-2xl sm:text-3xl tracking-tighter text-slate-900 font-extrabold group-hover:text-slate-800 transition-colors">BIG</span>
                <span className="text-2xl sm:text-3xl text-brand-orange tracking-tighter animate-logo-b ml-[1px] font-extrabold">B</span>
              </div>
              <div className="border-l border-slate-200 pl-2.5 sm:pl-3 hidden sm:flex flex-col">
                <span className="text-[10px] font-mono font-bold tracking-widest text-brand-orange uppercase group-hover:text-orange-600 transition-colors">
                  ADMIN COMMAND CENTER
                </span>
                <span className="text-[9px] font-mono text-slate-400 font-medium">
                  BIG B WAREHOUSE MANAGEMENT
                </span>
              </div>
            </button>
          </div>

          {/* Quick Actions & User Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Clock & User Badge */}
            <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-200/90 px-3.5 py-1.5 rounded-xl">
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                <Clock className="w-3.5 h-3.5 text-brand-orange" />
                <span>{currentTime}</span>
              </div>
              <div className="h-3.5 w-px bg-slate-200"></div>
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-slate-800">{user?.username || 'Bigbadmin'}</span>
              </div>
            </div>

            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-brand-orange px-2.5 sm:px-3.5 py-2 rounded-xl font-mono text-[11px] sm:text-xs uppercase border border-slate-200 transition-all shadow-xs shrink-0"
              title="Open public website in new tab"
            >
              <span>LIVE SITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 hover:text-red-700 px-2.5 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-mono uppercase font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" /> <span className="hidden sm:inline">LOG OUT</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* Navigation Tabs Bar with OVERVIEW as Tab #1 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-2.5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 p-3 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl font-mono text-[11px] sm:text-xs uppercase font-bold transition-all cursor-pointer shadow-xs ${
              activeTab === 'overview'
                ? 'bg-brand-orange text-white border border-orange-400 shadow-md shadow-brand-orange/20 scale-[1.01]'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:text-brand-orange hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span className="truncate">OVERVIEW</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 p-3 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl font-mono text-[11px] sm:text-xs uppercase font-bold transition-all cursor-pointer shadow-xs relative ${
              activeTab === 'enquiries'
                ? 'bg-brand-orange text-white border border-orange-400 shadow-md shadow-brand-orange/20 scale-[1.01]'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:text-brand-orange hover:bg-slate-50'
            }`}
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span className="truncate">ENQUIRIES ({enquiries.length})</span>
            {pendingEnquiriesCount > 0 && activeTab !== 'enquiries' && (
              <span className="w-2.5 h-2.5 rounded-full bg-brand-orange absolute top-2 right-2 border-2 border-white animate-pulse"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 p-3 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl font-mono text-[11px] sm:text-xs uppercase font-bold transition-all cursor-pointer shadow-xs ${
              activeTab === 'gallery'
                ? 'bg-brand-orange text-white border border-orange-400 shadow-md shadow-brand-orange/20 scale-[1.01]'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:text-brand-orange hover:bg-slate-50'
            }`}
          >
            <Image className="w-4 h-4 shrink-0" />
            <span className="truncate">GALLERY ({galleryImages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('facilities')}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 p-3 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl font-mono text-[11px] sm:text-xs uppercase font-bold transition-all cursor-pointer shadow-xs ${
              activeTab === 'facilities'
                ? 'bg-brand-orange text-white border border-orange-400 shadow-md shadow-brand-orange/20 scale-[1.01]'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:text-brand-orange hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span className="truncate">FACILITIES ({facilities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`col-span-2 sm:col-span-1 md:col-span-1 flex items-center justify-center gap-1.5 sm:gap-2 p-3 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl font-mono text-[11px] sm:text-xs uppercase font-bold transition-all cursor-pointer shadow-xs ${
              activeTab === 'content'
                ? 'bg-brand-orange text-white border border-orange-400 shadow-md shadow-brand-orange/20 scale-[1.01]'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:text-brand-orange hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span className="truncate">SITE WORDS</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* --- TAB 0: EXCITING EXECUTIVE OVERVIEW DASHBOARD --- */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            
            {/* Operations Overview Professional Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-2 border-b border-slate-200/80">
              <div>
                <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-bold">OPERATIONS DASHBOARD</span>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-slate-900 tracking-tight mt-0.5">
                  SYSTEM OVERVIEW & METRICS
                </h1>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={refreshAllData}
                  className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-mono font-bold uppercase border border-slate-200/90 transition-all cursor-pointer shadow-xs active:scale-95 w-full sm:w-auto"
                  title="Reload latest data from API"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-brand-orange" />
                  <span>REFRESH METRICS</span>
                </button>
              </div>
            </div>

            {/* Metric KPI Cards (4 Cards) - Uniform responsive alignment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {/* Card 1: Client Enquiries */}
              <div 
                onClick={() => setActiveTab('enquiries')}
                className="bg-white border border-slate-200/90 hover:border-brand-orange rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4 h-full min-h-[190px]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-brand-orange group-hover:scale-105 transition-transform shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  {pendingEnquiriesCount > 0 ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase animate-pulse shrink-0">
                      {pendingEnquiriesCount} NEW LEADS
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase shrink-0">
                      ALL CAUGHT UP
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-3xl font-black text-slate-900 tracking-tight block">{enquiries.length}</span>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mt-0.5 truncate">CLIENT ENQUIRIES</h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {verifiedEnquiriesCount} verified · {pendingEnquiriesCount} pending action
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-brand-orange group-hover:translate-x-0.5 transition-transform">
                  <span>REVIEW LEADS</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card 2: Gallery Images */}
              <div 
                onClick={() => setActiveTab('gallery')}
                className="bg-white border border-slate-200/90 hover:border-blue-500 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4 h-full min-h-[190px]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform shrink-0">
                    <Image className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase shrink-0">
                    {activeImagesCount} PUBLISHED
                  </span>
                </div>

                <div>
                  <span className="text-3xl font-black text-slate-900 tracking-tight block">{galleryImages.length}</span>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mt-0.5 truncate">GALLERY PICTURES</h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    High-res warehouse and dock photos
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                  <span>MANAGE MEDIA</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card 3: Facilities Features */}
              <div 
                onClick={() => setActiveTab('facilities')}
                className="bg-white border border-slate-200/90 hover:border-emerald-500 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4 h-full min-h-[190px]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform shrink-0">
                    <Layers className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase shrink-0">
                    {activeFacilitiesCount} ACTIVE
                  </span>
                </div>

                <div>
                  <span className="text-3xl font-black text-slate-900 tracking-tight block">{facilities.length}</span>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mt-0.5 truncate">FACILITIES & SPECS</h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    Weighbridge, crane & warehouse specs
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-emerald-600 group-hover:translate-x-0.5 transition-transform">
                  <span>VIEW SPECS</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card 4: Site Words & Content */}
              <div 
                onClick={() => setActiveTab('content')}
                className="bg-white border border-slate-200/90 hover:border-purple-500 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4 h-full min-h-[190px]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 group-hover:scale-105 transition-transform shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-purple-50 text-purple-700 border border-purple-200 uppercase shrink-0">
                    SYNCED
                  </span>
                </div>

                <div>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight truncate block">
                    {companyForm.name || 'BigB Warehouse'}
                  </span>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mt-0.5 truncate">WEBSITE COPY & TEXT</h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    Hero headline & contact numbers
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-purple-600 group-hover:translate-x-0.5 transition-transform">
                  <span>EDIT SITE WORDS</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Quick Action Launchpad */}
            <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-4 sm:mb-5">
                <div>
                  <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-bold">OPERATIONAL SHORTCUTS</span>
                  <h2 className="text-lg sm:text-xl font-black uppercase text-slate-900 tracking-tight">QUICK ACTION LAUNCHPAD</h2>
                </div>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">1-Click Direct Management</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200/90 hover:border-brand-orange/50 transition-all text-left flex items-start gap-3.5 sm:gap-4 group cursor-pointer h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900 uppercase truncate">Review Inquiries</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">Check new inquiries from potential clients.</p>
                  </div>
                </button>

                <button
                  onClick={() => setShowAddImageModal(true)}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/90 hover:border-blue-500/50 transition-all text-left flex items-start gap-3.5 sm:gap-4 group cursor-pointer h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shrink-0">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900 uppercase truncate">Upload New Photo</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">Add warehouse pictures to the live gallery.</p>
                  </div>
                </button>

                <button
                  onClick={() => setShowAddFacilityModal(true)}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/90 hover:border-emerald-500/50 transition-all text-left flex items-start gap-3.5 sm:gap-4 group cursor-pointer h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900 uppercase truncate">Add Facility Spec</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">Add new machinery, docks, or storage specs.</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('content')}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-purple-50/50 border border-slate-200/90 hover:border-purple-500/50 transition-all text-left flex items-start gap-3.5 sm:gap-4 group cursor-pointer h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform shrink-0">
                    <Edit2 className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900 uppercase truncate">Edit Site Words</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">Update phone, address, and hero headline.</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Split Activity & Media Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              
              {/* Left Column: Recent Enquiries Desk */}
              <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-slate-100 gap-2">
                    <div>
                      <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-bold">CLIENT LEADS STREAM</span>
                      <h2 className="text-lg sm:text-xl font-black uppercase text-slate-900 tracking-tight">RECENT INQUIRIES</h2>
                    </div>
                    <button
                      onClick={() => setActiveTab('enquiries')}
                      className="text-xs font-mono font-bold text-brand-orange hover:text-orange-600 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <span>VIEW ALL ({enquiries.length})</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 sm:mt-5 space-y-3.5">
                    {enquiries.length === 0 ? (
                      <div className="py-10 sm:py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-4 sm:p-6">
                        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center mx-auto mb-3 shadow-xs text-slate-400">
                          <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-slate-800 uppercase text-sm">No Client Inquiries Received Yet</h3>
                        <p className="text-xs text-slate-500 font-mono mt-1 max-w-sm mx-auto">
                          Client submissions from the website contact page will appear here immediately with one-click verification.
                        </p>
                      </div>
                    ) : (
                      enquiries.slice(0, 3).map((enq) => {
                        const isVerified = enq.status === 'VERIFIED';
                        return (
                          <div 
                            key={enq.id}
                            className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all ${
                              isVerified 
                                ? 'bg-emerald-50/30 border-emerald-200' 
                                : 'bg-slate-50 border-slate-200/90 hover:border-brand-orange/40'
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-slate-900 text-sm uppercase break-words">{enq.full_name || enq.name}</span>
                                {isVerified ? (
                                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                                    VERIFIED
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full animate-pulse shrink-0">
                                    NEW LEAD
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] font-mono text-slate-400 shrink-0">
                                {new Date(enq.created_at).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="text-xs font-mono text-slate-600 mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                              <a href={`tel:${enq.phone}`} className="hover:text-brand-orange">{enq.phone}</a>
                              <span>·</span>
                              <a href={`mailto:${enq.email}`} className="hover:text-brand-orange break-all">{enq.email}</a>
                              {enq.company_name && (
                                <>
                                  <span>·</span>
                                  <span className="font-bold text-slate-800 break-words">{enq.company_name}</span>
                                </>
                              )}
                            </div>

                            {enq.message && (
                              <p className="text-xs text-slate-700 mt-2 line-clamp-2 break-words italic bg-white/80 p-2.5 rounded-lg border border-slate-200/60">
                                "{enq.message}"
                              </p>
                            )}

                            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-3 border-t border-slate-200/60 text-xs font-mono">
                              <button
                                onClick={() => handleToggleEnquiryStatus(enq)}
                                className={`font-bold transition-colors cursor-pointer ${
                                  isVerified ? 'text-slate-500 hover:text-slate-800' : 'text-brand-orange hover:text-orange-700'
                                }`}
                              >
                                {isVerified ? 'Reset to New' : '✓ Mark as Verified'}
                              </button>

                              <button
                                onClick={() => setActiveTab('enquiries')}
                                className="text-slate-500 hover:text-brand-orange transition-colors cursor-pointer"
                              >
                                View full details →
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs font-mono text-slate-500">
                    Showing latest 3 of {enquiries.length} total inquiries
                  </span>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs font-bold uppercase transition-all cursor-pointer w-full sm:w-auto"
                  >
                    <span>OPEN LEADS DESK</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-orange" />
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Media & Website Contact Card */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Visual Media Snapshot */}
                <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 gap-2">
                    <div>
                      <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-bold">MEDIA ENGINE</span>
                      <h2 className="text-base sm:text-lg font-black uppercase text-slate-900 tracking-tight">GALLERY ASSETS ({galleryImages.length})</h2>
                    </div>
                    <button
                      onClick={() => setShowAddImageModal(true)}
                      className="text-xs font-mono font-bold text-brand-orange hover:text-orange-600 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>ADD PHOTO</span>
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
                    {galleryImages.slice(0, 4).map((img) => (
                      <div key={img.id} className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group shadow-xs">
                        <img 
                          src={img.image_display || img.image || img.image_url} 
                          alt={img.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-2 text-white">
                          <span className="text-[10px] font-mono font-bold truncate uppercase">{img.title}</span>
                          <span className="text-[9px] text-brand-orange font-mono uppercase truncate">{img.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">
                      {activeImagesCount} photos visible online
                    </span>
                    <button
                      onClick={() => setActiveTab('gallery')}
                      className="text-xs font-mono font-bold text-brand-orange hover:underline cursor-pointer"
                    >
                      Manage Gallery →
                    </button>
                  </div>
                </div>

                {/* Live Contact & Location Metadata Preview */}
                <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-2">
                    <div>
                      <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-bold">PUBLIC REACH</span>
                      <h2 className="text-base sm:text-lg font-black uppercase text-slate-900 tracking-tight">CONTACT & LOCATION</h2>
                    </div>
                    <button
                      onClick={() => setActiveTab('content')}
                      className="text-xs font-mono font-bold text-brand-orange hover:underline cursor-pointer shrink-0"
                    >
                      Edit →
                    </button>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                      <span className="font-mono text-slate-800 font-bold truncate">{companyForm.phone || '+91 7909294488'}</span>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                      <span className="font-mono text-slate-800 break-all">{companyForm.email || 'contact@bigbwarehouse.com'}</span>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                      <span className="text-slate-700 leading-snug break-words">{companyForm.address || 'Parippally, Kollam District, Kerala - 691574'}</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* --- TAB 1: CLIENT ENQUIRIES VIEWER --- */}
        {/* ========================================================= */}
        {activeTab === 'enquiries' && (
          <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-100 pb-5 sm:pb-6">
              <div>
                <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-bold">CLIENT COMMUNICATIONS</span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 tracking-tight mt-1">CLIENT ENQUIRIES & MESSAGES</h2>
                <p className="text-xs font-mono text-slate-500 mt-1">Review, verify and manage inquiry submissions received from the contact form.</p>
              </div>
              <button
                onClick={fetchEnquiries}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer self-start sm:self-auto shadow-xs w-full sm:w-auto shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingEnquiries ? 'animate-spin' : ''}`} /> REFRESH LIST
              </button>
            </div>

            {loadingEnquiries ? (
              <div className="text-center py-16 font-mono text-brand-orange text-lg">LOADING MESSAGES...</div>
            ) : enquiries.length === 0 ? (
              <div className="text-center py-16 sm:py-20 px-4 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
                <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center mx-auto mb-3 shadow-xs text-slate-400">
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
                      className={`border rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm hover:shadow-md transition-all ${
                        isVerified 
                          ? 'bg-emerald-50/20 border-emerald-200' 
                          : 'bg-slate-50/80 border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-b border-slate-200/80 pb-3 sm:pb-4">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <span className="font-bold text-slate-900 text-base sm:text-lg uppercase tracking-wide break-words">{enq.full_name || enq.name}</span>

                          {/* Status Badge */}
                          {isVerified ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-300 shrink-0">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> VERIFIED
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300 shrink-0">
                              <AlertCircle className="w-3 h-3 text-amber-600" /> PENDING REVIEW
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-slate-600 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-xs self-start sm:self-auto shrink-0">{new Date(enq.created_at).toLocaleString()}</span>
                      </div>

                      <div className="text-xs text-slate-600 font-mono font-semibold flex flex-wrap items-center gap-x-3 gap-y-1 break-all">
                        <a href={`mailto:${enq.email}`} className="hover:text-brand-orange underline decoration-slate-300">{enq.email}</a>
                        <span className="hidden sm:inline">·</span>
                        <a href={`tel:${enq.phone}`} className="hover:text-brand-orange underline decoration-slate-300">{enq.phone}</a>
                      </div>

                      {(enq.company_name || enq.requirement) && (
                        <div className="flex flex-wrap gap-2 text-xs font-mono font-bold">
                          {enq.company_name && (
                            <span className="bg-slate-200/80 text-slate-800 px-2.5 py-1 rounded-lg break-words">
                              COMPANY: {enq.company_name}
                            </span>
                          )}
                          {enq.requirement && (
                            <span className="bg-brand-orange/10 text-brand-orange border border-brand-orange/20 px-2.5 py-1 rounded-lg break-words">
                              REQUIREMENT: {enq.requirement}
                            </span>
                          )}
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-white p-3.5 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs font-normal break-words">
                        {enq.message ? enq.message : <span className="text-slate-400 italic">No additional message provided.</span>}
                      </p>

                      {/* Action buttons row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200/70">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => handleToggleEnquiryStatus(enq)}
                            className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
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
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl border border-red-200 text-xs font-mono font-bold uppercase transition-all cursor-pointer active:scale-95 shadow-xs"
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

        {/* ========================================================= */}
        {/* --- TAB 2: GALLERY & PICTURE MANAGER --- */}
        {/* ========================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-bold">VISUAL MEDIA MANAGEMENT</span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 tracking-tight mt-1">WEBSITE GALLERY & PICTURES</h2>
                <p className="text-xs font-mono text-slate-500 mt-1">Upload pictures or change images for any section of the website.</p>
              </div>

              <button
                onClick={() => setShowAddImageModal(true)}
                className="cta-light-sweep bg-brand-orange hover:bg-orange-600 text-white font-black px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 text-xs shadow-md border border-orange-400 cursor-pointer active:scale-95 w-full sm:w-auto shrink-0"
              >
                <Plus className="w-4 h-4" /> ADD NEW PICTURE
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {['All', 'Warehouse', 'Loading', 'Parking', 'Facilities', 'Hero', 'About', 'General'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryCategoryFilter(cat)}
                  className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-mono text-xs uppercase transition-all cursor-pointer ${
                    galleryCategoryFilter === cat
                      ? 'bg-brand-orange text-white font-bold border border-orange-400 shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:text-brand-orange hover:bg-slate-50 shadow-xs'
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredGallery.map((img) => (
                  <div
                    key={img.id}
                    className={`bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full ${
                      img.is_active ? 'border-slate-200 hover:border-brand-orange/60' : 'border-red-200 opacity-60'
                    }`}
                  >
                    <div className="relative aspect-video bg-slate-100 overflow-hidden">
                      <img
                        src={img.image_display || img.image || img.image_url}
                        alt={img.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-brand-orange border border-slate-200 uppercase shadow-xs max-w-[50%] truncate">
                        {img.category}
                      </div>
                      <div className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase shadow-xs ${
                        img.is_active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {img.is_active ? 'VISIBLE' : 'HIDDEN'}
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                      <div>
                        <h3 className="font-bold text-slate-900 uppercase text-sm sm:text-base tracking-wide line-clamp-1">{img.title}</h3>
                        {img.description && (
                          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2 break-words">{img.description}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 gap-2">
                        <button
                          onClick={() => handleToggleGalleryActive(img)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
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
                          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 p-2 sm:p-2.5 rounded-xl transition-all cursor-pointer active:scale-95 shadow-xs"
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

        {/* ========================================================= */}
        {/* --- TAB 3: FACILITIES MANAGER --- */}
        {/* ========================================================= */}
        {activeTab === 'facilities' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-bold">INFRASTRUCTURE SPECS</span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 tracking-tight mt-1">FACILITIES & FEATURES MANAGER</h2>
                <p className="text-xs font-mono text-slate-500 mt-1">Manage warehouse features, weighbridge specs, and facility details.</p>
              </div>

              <button
                onClick={() => setShowAddFacilityModal(true)}
                className="cta-light-sweep bg-brand-orange hover:bg-orange-600 text-white font-black px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 text-xs shadow-md border border-orange-400 cursor-pointer active:scale-95 w-full sm:w-auto shrink-0"
              >
                <Plus className="w-4 h-4" /> ADD NEW FACILITY
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {facilities.map((fac) => (
                <div key={fac.id} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all h-full">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="w-full sm:w-28 sm:h-28 aspect-video sm:aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative">
                      {fac.image_display || fac.image || fac.image_url ? (
                        <img 
                          src={fac.image_display || fac.image || fac.image_url} 
                          alt={fac.title} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand-orange bg-orange-50/50">
                          <Layers className="w-10 h-10" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 w-full min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-base sm:text-lg uppercase tracking-wide break-words">{fac.title}</h3>
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase shadow-xs shrink-0 ${
                          fac.is_active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {fac.is_active ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal break-words">{fac.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2.5 pt-3 sm:pt-4 border-t border-slate-100">
                    <button
                      onClick={() => handleToggleFacilityActive(fac)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-mono uppercase cursor-pointer border border-slate-200 transition-colors font-bold shadow-xs"
                    >
                      {fac.is_active ? 'DEACTIVATE' : 'ACTIVATE'}
                    </button>
                    <button
                      onClick={() => handleDeleteFacility(fac.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 p-2 sm:p-2.5 rounded-xl border border-red-200 cursor-pointer active:scale-95 transition-colors shadow-xs"
                      title="Delete Facility"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* --- TAB 4: EDIT WEBSITE WORDS & CONTENT --- */}
        {/* ========================================================= */}
        {activeTab === 'content' && (
          <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-slate-200">
              <div>
                <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-bold">WEBSITE COPY ENGINE</span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 tracking-tight mt-1">EDIT WEBSITE WORDS & TEXT</h2>
                <p className="text-xs font-mono text-slate-500 mt-1">Updates saved here immediately change headlines, paragraphs, and contact numbers across all pages.</p>
              </div>

              <button
                onClick={handleSaveCompanyContent}
                disabled={savingContent}
                className="cta-light-sweep bg-brand-orange hover:bg-orange-600 text-white font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 text-xs shadow-md border border-orange-400 cursor-pointer transition-all active:scale-95 w-full sm:w-auto shrink-0"
              >
                <Save className="w-4 h-4" /> {savingContent ? 'SAVING...' : 'SAVE ALL CHANGES'}
              </button>
            </div>

            <form onSubmit={handleSaveCompanyContent} className="space-y-6 sm:space-y-8">
              {/* Homepage Hero Section Words */}
              <div className="bg-slate-50/80 p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 space-y-4 sm:space-y-5">
                <div className="flex items-center gap-2 text-brand-orange font-mono text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-4 h-4" /> HOMEPAGE HERO BANNER WORDS
                </div>
                
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">MAIN HERO HEADLINE</label>
                  <input
                    type="text"
                    value={companyForm.hero_title}
                    onChange={(e) => setCompanyForm({ ...companyForm, hero_title: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 text-slate-900 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-sm font-bold shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">HERO SUBTITLE / PARAGRAPH</label>
                  <textarea
                    rows={3}
                    value={companyForm.hero_subtitle}
                    onChange={(e) => setCompanyForm({ ...companyForm, hero_subtitle: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 text-slate-900 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-sm leading-relaxed shadow-xs"
                  />
                </div>
              </div>

              {/* About & Tagline Words */}
              <div className="bg-slate-50/80 p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 space-y-4 sm:space-y-5">
                <div className="flex items-center gap-2 text-brand-orange font-mono text-xs font-bold uppercase tracking-wider">
                  <FileText className="w-4 h-4" /> ABOUT SECTION & TAGLINE WORDS
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">COMPANY TAGLINE</label>
                  <input
                    type="text"
                    value={companyForm.tagline}
                    onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 text-slate-900 focus:border-brand-orange focus:outline-none text-sm font-bold shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">ABOUT PAGE PARAGRAPH</label>
                  <textarea
                    rows={4}
                    value={companyForm.about_text}
                    onChange={(e) => setCompanyForm({ ...companyForm, about_text: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 text-slate-900 focus:border-brand-orange focus:outline-none text-sm leading-relaxed shadow-xs"
                  />
                </div>
              </div>

              {/* Contact Information Words */}
              <div className="bg-slate-50/80 p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 space-y-4 sm:space-y-5">
                <div className="flex items-center gap-2 text-brand-orange font-mono text-xs font-bold uppercase tracking-wider">
                  <Phone className="w-4 h-4" /> CONTACT & LOCATION DETAILS
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">PHONE NUMBER</label>
                    <input
                      type="text"
                      value={companyForm.phone}
                      onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 text-slate-900 focus:border-brand-orange focus:outline-none font-mono text-sm shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      value={companyForm.email}
                      onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 text-slate-900 focus:border-brand-orange focus:outline-none font-mono text-sm shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">WHATSAPP NUMBER</label>
                    <input
                      type="text"
                      value={companyForm.whatsapp}
                      onChange={(e) => setCompanyForm({ ...companyForm, whatsapp: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 text-slate-900 focus:border-brand-orange focus:outline-none font-mono text-sm shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">PHYSICAL ADDRESS</label>
                  <textarea
                    rows={2}
                    value={companyForm.address}
                    onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 text-slate-900 focus:border-brand-orange focus:outline-none text-sm leading-relaxed shadow-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2 sm:pt-4">
                <button
                  type="submit"
                  disabled={savingContent}
                  className="cta-light-sweep bg-brand-orange hover:bg-orange-600 text-white font-black px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl uppercase tracking-wider flex items-center justify-center gap-3 text-sm shadow-md border border-orange-400 cursor-pointer active:scale-95 w-full sm:w-auto"
                >
                  <Save className="w-5 h-5" /> {savingContent ? 'SAVING CHANGES...' : 'SAVE ALL WEBSITE WORDS'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* --- ADD NEW PICTURE MODAL --- */}
      {showAddImageModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl space-y-5 text-slate-900 animate-fade-in my-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-lg sm:text-xl font-black uppercase text-slate-900">ADD NEW WEBSITE PICTURE</h3>
              <button onClick={() => setShowAddImageModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer text-lg p-1">✕</button>
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 text-slate-900 text-sm focus:bg-white focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">CATEGORY</label>
                <select
                  value={newImage.category}
                  onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 text-slate-900 text-sm focus:bg-white focus:border-brand-orange focus:outline-none font-mono shadow-xs"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 sm:p-3 text-xs text-slate-700 file:bg-brand-orange file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1 file:font-mono file:text-xs shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">OR ENTER DIRECT IMAGE URL</label>
                <input
                  type="url"
                  value={newImage.image_url}
                  onChange={(e) => setNewImage({ ...newImage, image_url: e.target.value })}
                  placeholder="https://example.com/picture.jpg"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 text-slate-900 text-sm focus:bg-white focus:border-brand-orange focus:outline-none font-mono shadow-xs"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 text-slate-900 text-sm focus:bg-white focus:border-brand-orange focus:outline-none shadow-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddImageModal(false)}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs uppercase cursor-pointer border border-slate-200"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider border border-orange-400 shadow-md cursor-pointer transition-all active:scale-95"
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl space-y-5 text-slate-900 animate-fade-in my-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-lg sm:text-xl font-black uppercase text-slate-900">ADD NEW FACILITY</h3>
              <button onClick={() => setShowAddFacilityModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer text-lg p-1">✕</button>
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 text-slate-900 text-sm focus:bg-white focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">IMAGE FILE OR IMAGE URL</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewFacility({ ...newFacility, image_file: e.target.files[0] })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 sm:p-3 text-xs text-slate-700 file:bg-brand-orange file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1 file:font-mono file:text-xs mb-2 shadow-xs"
                />
                <input
                  type="url"
                  value={newFacility.image_url}
                  onChange={(e) => setNewFacility({ ...newFacility, image_url: e.target.value })}
                  placeholder="https://example.com/facility.jpg"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 text-slate-900 text-sm focus:bg-white focus:border-brand-orange focus:outline-none font-mono shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={newFacility.description}
                  onChange={(e) => setNewFacility({ ...newFacility, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 text-slate-900 text-sm focus:bg-white focus:border-brand-orange focus:outline-none shadow-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddFacilityModal(false)}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs uppercase cursor-pointer border border-slate-200"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider border border-orange-400 shadow-md cursor-pointer transition-all active:scale-95"
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
