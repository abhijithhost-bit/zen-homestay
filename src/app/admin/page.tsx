'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Shield, Lock, LogOut, RefreshCw, BedDouble, Home, 
  CheckCircle2, XCircle, AlertCircle, Clock, Users, IndianRupee,
  KeyRound, UserCheck, Edit3, Plus, Trash2, Calendar, CalendarOff,
  Check, X, TrendingUp, Tag
} from 'lucide-react';
import { supabase, isSupabaseConfigured, Room, PropertySettings, DateBlock, PricingRule } from '@/lib/supabase';

// Helper to format date for display
function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getTomorrowStr(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function AdminPage() {
  const [sessionUser, setSessionUser] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  
  // Login form state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Live Supabase data
  const [rooms, setRooms] = useState<Room[]>([]);
  const [settings, setSettings] = useState<PropertySettings | null>(null);
  const [dateBlocks, setDateBlocks] = useState<DateBlock[]>([]);
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([]);
  const [fetchError, setFetchError] = useState('');
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  // Toast Notification State
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ type, message });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Whole Floor Edit Modal State
  const [showWfModal, setShowWfModal] = useState(false);
  const [wfPriceRupees, setWfPriceRupees] = useState<number>(6000);
  const [wfMaxGuests, setWfMaxGuests] = useState<number>(6);
  const [wfIsActive, setWfIsActive] = useState<boolean>(true);
  const [wfSaving, setWfSaving] = useState(false);

  // Room Edit Modal State
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [roomPriceRupees, setRoomPriceRupees] = useState<number>(3000);
  const [roomMaxGuests, setRoomMaxGuests] = useState<number>(3);
  const [roomIsActive, setRoomIsActive] = useState<boolean>(true);
  const [roomSaving, setRoomSaving] = useState(false);

  // Manual Date Blocking Form State
  const [blockTarget, setBlockTarget] = useState<string>('all'); // 'all' or room.id
  const [blockStartDate, setBlockStartDate] = useState<string>(getTodayStr());
  const [blockEndDate, setBlockEndDate] = useState<string>(getTomorrowStr());
  const [blockReason, setBlockReason] = useState<string>('Offline booking via WhatsApp');
  const [blockSubmitting, setBlockSubmitting] = useState(false);
  const [deletingBlockId, setDeletingBlockId] = useState<string | null>(null);

  // Seasonal Pricing / Custom Rate Form State
  const [priceTarget, setPriceTarget] = useState<string>('all'); // 'all' or room.id
  const [priceStartDate, setPriceStartDate] = useState<string>(getTodayStr());
  const [priceEndDate, setPriceEndDate] = useState<string>(getTomorrowStr());
  const [priceRateRupees, setPriceRateRupees] = useState<number>(3500);
  const [priceTitle, setPriceTitle] = useState<string>('Holiday Weekend Rate');
  const [priceSubmitting, setPriceSubmitting] = useState(false);
  const [deletingRuleId, setDeletingRuleId] = useState<string | null>(null);

  // Check auth session
  const checkAuth = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setAuthLoading(false);
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setSessionUser(null);
        setIsAdmin(false);
        setAuthLoading(false);
        return;
      }

      setSessionUser(user.email || user.id);

      // Verify admin role against admin_users table
      const { data: adminRecord } = await supabase
        .from('admin_users')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      const hasAdmin = Boolean(adminRecord?.role === 'admin' || user.app_metadata?.role === 'admin');
      setIsAdmin(hasAdmin);
    } catch (err: unknown) {
      console.error('Session check failed:', err);
      setIsAdmin(false);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // Fetch Rooms, Property Settings, Date Blocks & Pricing Rules
  const loadDashboardData = useCallback(async () => {
    setDataLoading(true);
    setFetchError('');

    try {
      // 1. Fetch Physical Rooms
      const { data: roomsData, error: roomsErr } = await supabase
        .from('rooms')
        .select('*')
        .order('sort_order', { ascending: true });

      if (roomsErr) throw roomsErr;
      setRooms(roomsData || []);

      // 2. Fetch Property Settings
      const { data: settingsData, error: settingsErr } = await supabase
        .from('property_settings')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (settingsErr) throw settingsErr;
      setSettings(settingsData);

      // 3. Fetch Active Date Blocks
      const { data: blocksData, error: blocksErr } = await supabase
        .from('date_blocks')
        .select('*')
        .order('start_date', { ascending: true });

      if (blocksErr) {
        console.warn('Notice loading date blocks:', blocksErr.message);
      } else {
        setDateBlocks(blocksData || []);
      }

      // 4. Fetch Active Pricing Rules
      const { data: rulesData, error: rulesErr } = await supabase
        .from('pricing_rules')
        .select('*')
        .order('start_date', { ascending: true });

      if (rulesErr) {
        console.warn('Notice loading pricing rules:', rulesErr.message);
      } else {
        setPricingRules(rulesData || []);
      }

      setLastFetched(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to query live data from Supabase';
      setFetchError(msg);
      showToast(msg, 'error');
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
    loadDashboardData();
  }, [checkAuth, loadDashboardData]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setSessionUser(data.user.email || data.user.id);
        setShowLoginModal(false);
        showToast('Signed in successfully as Admin', 'success');
        await checkAuth();
        await loadDashboardData();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setLoginError(msg);
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSessionUser(null);
    setIsAdmin(false);
    showToast('Signed out of Admin Dashboard', 'info');
    await loadDashboardData();
  };

  // Open Whole Floor Modal with current values
  const handleOpenWfModal = () => {
    if (!sessionUser) {
      setShowLoginModal(true);
      showToast('Please sign in to edit Whole Floor settings', 'info');
      return;
    }
    if (settings) {
      setWfPriceRupees(Math.round(settings.whole_floor_base_price_paise / 100));
      setWfMaxGuests(settings.whole_floor_max_guests);
      setWfIsActive(settings.whole_floor_is_active);
    }
    setShowWfModal(true);
  };

  // Save Whole Floor Settings
  const handleSaveWholeFloor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setWfSaving(true);
    try {
      const priceInPaise = Math.round(Number(wfPriceRupees) * 100);
      const guests = Math.max(1, Number(wfMaxGuests));

      const { error } = await supabase
        .from('property_settings')
        .update({
          whole_floor_base_price_paise: priceInPaise,
          whole_floor_max_guests: guests,
          whole_floor_is_active: wfIsActive,
          updated_at: new Date().toISOString(),
        })
        .eq('id', settings.id);

      if (error) throw error;

      showToast('Whole Floor settings updated successfully!', 'success');
      setShowWfModal(false);
      await loadDashboardData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save Whole Floor settings';
      showToast(msg, 'error');
    } finally {
      setWfSaving(false);
    }
  };

  // Open Room Modal with current values
  const handleOpenRoomModal = (room: Room) => {
    if (!sessionUser) {
      setShowLoginModal(true);
      showToast('Please sign in to edit room inventory', 'info');
      return;
    }
    setEditingRoom(room);
    setRoomPriceRupees(Math.round(room.base_price_paise / 100));
    setRoomMaxGuests(room.max_guests);
    setRoomIsActive(room.is_active);
  };

  // Save Room Settings
  const handleSaveRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoom) return;

    setRoomSaving(true);
    try {
      const priceInPaise = Math.round(Number(roomPriceRupees) * 100);
      const guests = Math.max(1, Number(roomMaxGuests));

      const { error } = await supabase
        .from('rooms')
        .update({
          base_price_paise: priceInPaise,
          max_guests: guests,
          is_active: roomIsActive,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingRoom.id);

      if (error) throw error;

      showToast(`${editingRoom.name} updated successfully!`, 'success');
      setEditingRoom(null);
      await loadDashboardData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save room details';
      showToast(msg, 'error');
    } finally {
      setRoomSaving(false);
    }
  };

  // Submit Date Block / Offline Booking
  const handleCreateDateBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionUser) {
      setShowLoginModal(true);
      showToast('Please sign in to block dates', 'info');
      return;
    }

    if (blockStartDate >= blockEndDate) {
      showToast('End Date must be strictly after Start Date', 'error');
      return;
    }

    setBlockSubmitting(true);
    try {
      const targetRoomId = blockTarget === 'all' ? null : blockTarget;

      const { error } = await supabase
        .from('date_blocks')
        .insert({
          room_id: targetRoomId,
          start_date: blockStartDate,
          end_date: blockEndDate,
          reason: blockReason.trim() || 'Manual Host Block',
        });

      if (error) throw error;

      showToast('Dates blocked successfully! Public calendar will immediately reflect changes.', 'success');
      setBlockReason('Offline booking via WhatsApp');
      await loadDashboardData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create date block';
      showToast(msg, 'error');
    } finally {
      setBlockSubmitting(false);
    }
  };

  // Delete Date Block
  const handleDeleteDateBlock = async (blockId: string) => {
    if (!sessionUser) {
      setShowLoginModal(true);
      showToast('Please sign in to manage date blocks', 'info');
      return;
    }

    setDeletingBlockId(blockId);
    try {
      const { error } = await supabase
        .from('date_blocks')
        .delete()
        .eq('id', blockId);

      if (error) throw error;

      showToast('Date block removed. Dates are unblocked on the calendar.', 'success');
      await loadDashboardData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete date block';
      showToast(msg, 'error');
    } finally {
      setDeletingBlockId(null);
    }
  };

  // Submit Custom Rate / Pricing Rule
  const handleCreatePricingRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionUser) {
      setShowLoginModal(true);
      showToast('Please sign in to set custom rates', 'info');
      return;
    }

    if (priceStartDate >= priceEndDate) {
      showToast('End Date must be strictly after Start Date', 'error');
      return;
    }

    if (!priceRateRupees || Number(priceRateRupees) <= 0) {
      showToast('Please enter a valid custom nightly rate', 'error');
      return;
    }

    setPriceSubmitting(true);
    try {
      const targetRoomId = priceTarget === 'all' ? null : priceTarget;
      const priceInPaise = Math.round(Number(priceRateRupees) * 100);

      const { error } = await supabase
        .from('pricing_rules')
        .insert({
          room_id: targetRoomId,
          start_date: priceStartDate,
          end_date: priceEndDate,
          price_paise: priceInPaise,
          title: priceTitle.trim() || 'Seasonal Custom Rate',
          is_active: true,
          priority: 1,
        });

      if (error) throw error;

      showToast(`Custom rate "${priceTitle.trim() || 'Seasonal Rate'}" published successfully!`, 'success');
      setPriceTitle('Holiday Weekend Rate');
      await loadDashboardData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to publish custom rate';
      showToast(msg, 'error');
    } finally {
      setPriceSubmitting(false);
    }
  };

  // Delete / Unpublish Pricing Rule
  const handleDeletePricingRule = async (ruleId: string) => {
    if (!sessionUser) {
      setShowLoginModal(true);
      showToast('Please sign in to manage pricing rules', 'info');
      return;
    }

    setDeletingRuleId(ruleId);
    try {
      const { error } = await supabase
        .from('pricing_rules')
        .delete()
        .eq('id', ruleId);

      if (error) throw error;

      showToast('Custom rate rule removed. Default base rate restored for those dates.', 'success');
      await loadDashboardData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete pricing rule';
      showToast(msg, 'error');
    } finally {
      setDeletingRuleId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-orange-500 selection:text-white">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-top-4 duration-200">
          <div className={`p-4 rounded-2xl border shadow-2xl flex items-start gap-3 backdrop-blur-md ${
            toast.type === 'success' 
              ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200 shadow-emerald-950/50' 
              : toast.type === 'error'
              ? 'bg-red-950/90 border-red-500/40 text-red-200 shadow-red-950/50'
              : 'bg-slate-900/90 border-sky-500/40 text-sky-200 shadow-slate-950/50'
          }`}>
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Clock className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />}
            <div className="flex-1 text-xs font-semibold leading-relaxed">
              {toast.message}
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-white p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-sky-600 to-orange-500 text-white font-black flex items-center justify-center text-sm shadow-md shadow-orange-500/10">
              ZH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white">Zen Homestay</span>
                <span className="text-[10px] bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Host Control &amp; Inventory Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={loadDashboardData}
              disabled={dataLoading}
              title="Refresh Live Data"
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${dataLoading ? 'animate-spin text-orange-400' : ''}`} />
            </button>

            {authLoading ? (
              <span className="text-xs text-slate-500">Checking auth...</span>
            ) : sessionUser ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <span className="text-xs font-bold text-slate-200 block truncate max-w-[180px]">{sessionUser}</span>
                  <span className="text-[10px] text-emerald-400 font-medium flex items-center justify-end gap-1">
                    <UserCheck className="w-3 h-3" /> {isAdmin ? 'Verified Admin' : 'Authenticated'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 rounded-xl transition-all cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-md shadow-orange-500/20 transition-all cursor-pointer active:scale-95"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Error notification */}
        {fetchError && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-xs">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div className="flex-1">
              <p className="font-bold">Error querying live data from Supabase:</p>
              <p className="text-[11px] text-red-300 mt-0.5">{fetchError}</p>
            </div>
            <button 
              type="button" 
              onClick={loadDashboardData}
              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Live Inventory &amp; Settings</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage physical room rates, capacities, whole-floor packages, seasonal pricing rules, and manual calendar blocks in real-time.
            </p>
          </div>
          {lastFetched && (
            <span className="text-[11px] text-slate-500 font-medium">
              Last synced: {lastFetched}
            </span>
          )}
        </div>

        {/* SECTION 1: Whole-Floor Configuration */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Home className="w-5 h-5 text-sky-400" />
              <h2 className="font-extrabold text-base">Whole-Floor Configuration (2nd Floor Tier)</h2>
            </div>
            {settings && (
              <button
                type="button"
                onClick={handleOpenWfModal}
                className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 border border-slate-700 hover:border-sky-500/50 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer active:scale-95"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Whole Floor</span>
              </button>
            )}
          </div>

          {settings ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                    Whole Floor Tier Title
                  </span>
                  <p className="font-black text-lg text-white">{settings.whole_floor_title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{settings.property_name}</p>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                    Whole-Floor Package Rate
                  </span>
                  <div className="flex items-baseline gap-1 text-2xl font-black text-white">
                    <span className="text-orange-500">₹</span>
                    <span>{(settings.whole_floor_base_price_paise / 100).toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-400 font-normal">/ night</span>
                  </div>
                  <span suppressHydrationWarning className="text-[10px] text-slate-500 font-mono">
                    ({settings.whole_floor_base_price_paise.toLocaleString('en-IN')} paise)
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                    Configured Max Capacity
                  </span>
                  <div className="flex items-center gap-1.5 text-lg font-black text-white">
                    <Users className="w-4 h-4 text-sky-400" />
                    <span>Up to {settings.whole_floor_max_guests} Guests</span>
                  </div>
                  <span className="text-xs text-slate-400">Reserves both physical rooms</span>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                    Whole Floor Status
                  </span>
                  <div>
                    {settings.whole_floor_is_active ? (
                      <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active &amp; Bookable
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold">
                        <XCircle className="w-3.5 h-3.5" /> Inactive
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Operational parameters */}
              <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Check-in Time</span>
                  <span className="font-bold text-slate-300 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" /> {settings.check_in_time}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Check-out Time</span>
                  <span className="font-bold text-slate-300 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" /> {settings.check_out_time}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Pending Hold Expiry</span>
                  <span className="font-bold text-slate-300 mt-0.5 block">{settings.pending_expiry_minutes} Minutes</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Max Advance Horizon</span>
                  <span className="font-bold text-slate-300 mt-0.5 block">{settings.max_advance_days} Days</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center text-xs text-slate-500">
              {dataLoading ? 'Loading property settings from Supabase...' : 'No property settings found in table public.property_settings.'}
            </div>
          )}
        </section>

        {/* SECTION 2: Physical Rooms */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <BedDouble className="w-5 h-5 text-orange-400" />
            <h2 className="font-extrabold text-base">Physical Rooms Inventory (Independent Capacities &amp; Rates)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <div 
                  key={room.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5 hover:border-slate-700 transition-colors relative"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] font-extrabold uppercase text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-md border border-orange-500/20">
                        Code: {room.code}
                      </span>
                      <h3 className="text-lg font-black text-white mt-2">{room.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {room.is_active ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[11px] font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full text-[11px] font-bold">
                          <XCircle className="w-3.5 h-3.5" /> Inactive
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleOpenRoomModal(room)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer active:scale-95"
                        title="Edit Room Settings"
                      >
                        <Edit3 className="w-4 h-4 text-orange-400" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Room Base Price</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <IndianRupee className="w-4 h-4 text-orange-500" />
                        <span className="text-xl font-black text-white">
                          {(room.base_price_paise / 100).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">/ night</span>
                      </div>
                      <span suppressHydrationWarning className="text-[10px] text-slate-600 font-mono">
                        {room.base_price_paise.toLocaleString('en-IN')} paise
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Max Guest Capacity</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Users className="w-4 h-4 text-sky-400" />
                        <span className="text-lg font-black text-white">{room.max_guests} Guests</span>
                      </div>
                      <span className="text-[10px] text-slate-500">Independent limit</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>ID: <code className="font-mono text-slate-400">{room.id.slice(0, 8)}...</code></span>
                    <button
                      type="button"
                      onClick={() => handleOpenRoomModal(room)}
                      className="text-orange-400 hover:text-orange-300 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" /> Edit Pricing &amp; Capacity
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center text-xs text-slate-500">
                {dataLoading ? 'Loading physical rooms from Supabase...' : 'No physical rooms found in table public.rooms.'}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: Manual Date Blocking Tool */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-white border-b border-slate-800 pb-3">
            <CalendarOff className="w-5 h-5 text-red-400" />
            <div>
              <h2 className="font-extrabold text-base">Block Dates / Offline Booking</h2>
              <p className="text-xs text-slate-400">
                Instantly close dates on the public calendar for WhatsApp inquiries, offline direct guests, or maintenance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Card */}
            <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-orange-400" />
                <span>Add Date Hold / Block</span>
              </h3>

              <form onSubmit={handleCreateDateBlock} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Target Inventory
                  </label>
                  <select
                    value={blockTarget}
                    onChange={(e) => setBlockTarget(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="all">Entire Property (Both Rooms &amp; Whole Floor)</option>
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.code})
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Blocking a single room also disables the Whole Floor tier for those dates.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={blockStartDate}
                      min={getTodayStr()}
                      onChange={(e) => setBlockStartDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      End Date
                    </label>
                    <input
                      type="date"
                      required
                      value={blockEndDate}
                      min={blockStartDate || getTodayStr()}
                      onChange={(e) => setBlockEndDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Reason / Notes
                  </label>
                  <input
                    type="text"
                    required
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                    placeholder="e.g. WhatsApp Direct Booking / Maintenance"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={blockSubmitting}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-3 rounded-xl text-xs transition-all shadow-md shadow-red-950/50 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {blockSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Block...</span>
                    </>
                  ) : (
                    <>
                      <CalendarOff className="w-3.5 h-3.5" />
                      <span>Apply Date Block</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Active Blocks List */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>Active Calendar Date Blocks ({dateBlocks.length})</span>
                </h3>
                <span className="text-[11px] text-slate-400">
                  Rows in <code className="text-orange-400">date_blocks</code>
                </span>
              </div>

              {dateBlocks.length > 0 ? (
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {dateBlocks.map((block) => {
                    const targetRoom = rooms.find((r) => r.id === block.room_id);
                    const isDeleting = deletingBlockId === block.id;

                    return (
                      <div
                        key={block.id}
                        className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                              block.room_id === null
                                ? 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                                : 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                            }`}>
                              {block.room_id === null ? 'Entire Property' : targetRoom?.name || 'Specific Room'}
                            </span>
                            <span className="text-xs font-bold text-white">
                              {formatDate(block.start_date)} → {formatDate(block.end_date)}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Reason: <span className="text-slate-300 font-medium">{block.reason || 'Manual block'}</span>
                          </p>
                        </div>

                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => handleDeleteDateBlock(block.id)}
                          className="self-end sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-500/30 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50 active:scale-95"
                          title="Remove Block (Unblock Dates)"
                        >
                          {isDeleting ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-400" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                          <span>Unblock</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800/80 text-xs text-slate-500">
                  <Calendar className="w-8 h-8 mx-auto text-slate-700 mb-2" />
                  No manual date blocks active. All open dates are governed by live bookings.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 4: Seasonal Pricing / Custom Rates */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-white border-b border-slate-800 pb-3">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="font-extrabold text-base">Seasonal Pricing &amp; Custom Rates</h2>
              <p className="text-xs text-slate-400">
                Set peak dates, holiday surge rates, or festival pricing overrides. The public booking engine dynamically applies these daily rates.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Custom Rate Form Card */}
            <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-400" />
                <span>Add Custom Rate Override</span>
              </h3>

              <form onSubmit={handleCreatePricingRule} className="space-y-4">
                {/* Target Selector */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Target Inventory
                  </label>
                  <select
                    value={priceTarget}
                    onChange={(e) => setPriceTarget(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option value="all">Entire Property (Whole Floor Package)</option>
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.code})
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Select a single room or the whole floor package rate.
                  </span>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={priceStartDate}
                      min={getTodayStr()}
                      onChange={(e) => setPriceStartDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      End Date
                    </label>
                    <input
                      type="date"
                      required
                      value={priceEndDate}
                      min={priceStartDate || getTodayStr()}
                      onChange={(e) => setPriceEndDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Custom Nightly Rate in Rupees */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Custom Nightly Rate (₹ per night)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      required
                      min={1}
                      value={priceRateRupees}
                      onChange={(e) => setPriceRateRupees(Number(e.target.value))}
                      placeholder="3500"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors font-bold"
                    />
                  </div>
                  <span suppressHydrationWarning className="text-[10px] text-slate-500 block mt-1">
                    Automatically converted to {Math.round(priceRateRupees * 100).toLocaleString('en-IN')} paise for storage.
                  </span>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Rule Title / Event Name
                  </label>
                  <input
                    type="text"
                    required
                    value={priceTitle}
                    onChange={(e) => setPriceTitle(e.target.value)}
                    placeholder="e.g. Holiday Weekend Rate, Nehru Trophy Race"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={priceSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl text-xs transition-all shadow-md shadow-emerald-950/50 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {priceSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Rate...</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Publish Custom Rate</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Active Rules List */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Active Pricing Rules ({pricingRules.length})</span>
                </h3>
                <span className="text-[11px] text-slate-400">
                  Rows in <code className="text-orange-400">pricing_rules</code>
                </span>
              </div>

              {pricingRules.length > 0 ? (
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {pricingRules.map((rule) => {
                    const targetRoom = rooms.find((r) => r.id === rule.room_id);
                    const isDeleting = deletingRuleId === rule.id;
                    const rateRupees = Math.round(rule.price_paise / 100);

                    return (
                      <div
                        key={rule.id}
                        className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                              rule.room_id === null
                                ? 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                                : 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                            }`}>
                              {rule.room_id === null ? 'Entire Property' : targetRoom?.name || 'Specific Room'}
                            </span>
                            <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                              <IndianRupee className="w-3 h-3" />
                              <span>{rateRupees.toLocaleString('en-IN')}/nt</span>
                            </span>
                            <span className="text-xs font-bold text-white">
                              {formatDate(rule.start_date)} → {formatDate(rule.end_date)}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Title: <span className="text-slate-200 font-bold">{rule.title || 'Seasonal Rate'}</span>
                          </p>
                        </div>

                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => handleDeletePricingRule(rule.id)}
                          className="self-end sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-500/30 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50 active:scale-95"
                          title="Unpublish / Delete Custom Rate"
                        >
                          {isDeleting ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-400" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                          <span>Unpublish / Delete</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800/80 text-xs text-slate-500">
                  <TrendingUp className="w-8 h-8 mx-auto text-slate-700 mb-2" />
                  No custom pricing rules active. Base nightly rates apply to all dates.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Security / Isolation Info Card */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl text-xs text-slate-400 space-y-1">
          <p className="font-bold text-slate-300 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            Live Supabase Integration Active
          </p>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Updates to room prices, capacities, date blocks, and custom seasonal rates are atomically synced with the database. Public calendar RPC automatically calculates live availability without revealing guest data.
          </p>
        </div>
      </main>

      {/* MODAL 1: Edit Whole Floor Settings */}
      {showWfModal && settings && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowWfModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-sky-400 tracking-wider">
                Property Tier Setting
              </span>
              <h3 className="text-lg font-black text-white">Edit Whole-Floor Configuration</h3>
              <p className="text-xs text-slate-400">Controls the package price and max capacity for both rooms combined.</p>
            </div>

            <form onSubmit={handleSaveWholeFloor} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Package Price (₹ per night)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-500 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    required
                    min={1}
                    value={wfPriceRupees}
                    onChange={(e) => setWfPriceRupees(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors font-bold"
                  />
                </div>
                <span suppressHydrationWarning className="text-[10px] text-slate-500 block mt-1">
                  Automatically saved as {Math.round(wfPriceRupees * 100).toLocaleString('en-IN')} paise in the database.
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Max Guest Capacity
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={12}
                  value={wfMaxGuests}
                  onChange={(e) => setWfMaxGuests(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Tier Availability Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setWfIsActive(true)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      wfIsActive 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm' 
                        : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" /> Active &amp; Bookable
                  </button>
                  <button
                    type="button"
                    onClick={() => setWfIsActive(false)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      !wfIsActive 
                        ? 'bg-red-500/20 text-red-400 border-red-500/40 shadow-sm' 
                        : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300'
                    }`}
                  >
                    <X className="w-3.5 h-3.5" /> Inactive
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowWfModal(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={wfSaving}
                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-extrabold transition-all shadow-md shadow-orange-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {wfSaving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Edit Room Settings */}
      {editingRoom && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setEditingRoom(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-orange-400 tracking-wider">
                Physical Inventory
              </span>
              <h3 className="text-lg font-black text-white">Edit {editingRoom.name}</h3>
              <p className="text-xs text-slate-400">Update base nightly rate and maximum guest capacity for this room.</p>
            </div>

            <form onSubmit={handleSaveRoom} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Base Price (₹ per night)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-500 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    required
                    min={1}
                    value={roomPriceRupees}
                    onChange={(e) => setRoomPriceRupees(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors font-bold"
                  />
                </div>
                <span suppressHydrationWarning className="text-[10px] text-slate-500 block mt-1">
                  Automatically converted to {Math.round(roomPriceRupees * 100).toLocaleString('en-IN')} paise for storage.
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Max Guest Capacity
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={6}
                  value={roomMaxGuests}
                  onChange={(e) => setRoomMaxGuests(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Room Active Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRoomIsActive(true)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      roomIsActive 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm' 
                        : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" /> Active &amp; Bookable
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoomIsActive(false)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      !roomIsActive 
                        ? 'bg-red-500/20 text-red-400 border-red-500/40 shadow-sm' 
                        : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300'
                    }`}
                  >
                    <X className="w-3.5 h-3.5" /> Inactive
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingRoom(null)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={roomSaving}
                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-extrabold transition-all shadow-md shadow-orange-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {roomSaving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Room</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Admin Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-orange-500 flex items-center justify-center text-white mx-auto shadow-md">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">Host Admin Sign In</h3>
              <p className="text-xs text-slate-400">Sign in with your registered admin credentials</p>
            </div>

            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="host@zenhomestay.in"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-orange-500/25 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loginLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In as Admin</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
