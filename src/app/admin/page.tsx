'use client';

import { useEffect, useState } from 'react';
import { getAdminDashboardData, updateOrderStatus } from '@/app/actions';
import {
  LayoutDashboard,
  ShoppingBag,
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Package,
  Search
} from 'lucide-react';

interface Client {
  id: string;
  nom: string;
  telephone: string;
  ville: string | null;
  _count: {
    commandes: number;
    rendezVous: number;
  }
}

interface Order {
  id: string;
  status: string;
  type_paiement: string;
  total: number;
  createdAt: Date;
  client: {
    nom: string;
    telephone: string;
  }
}

interface Appointment {
  id: string;
  date: Date;
  heure: string;
  motif: string;
  client: {
    nom: string;
    telephone: string;
  }
}

interface AdminData {
  success: boolean;
  orders: Order[];
  appointments: Appointment[];
  clients: Client[];
  stats: {
    totalSales: number;
    pendingOrders: number;
    todayAppointments: number;
    totalClients: number;
  }
  error?: string;
}

export default function AdminPage() {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await getAdminDashboardData();
    if (res.success && 'stats' in res) {
      setData(res as AdminData);
    } else if (res.error) {
      setData({
        success: false,
        orders: [],
        appointments: [],
        clients: [],
        stats: { totalSales: 0, pendingOrders: 0, todayAppointments: 0, totalClients: 0 },
        error: res.error
      });
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (orderId: string, status: string) => {
    const res = await updateOrderStatus(orderId, status);
    if (res.success) {
      fetchData();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-rose-600 border-opacity-50"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-gray-100">
          <h1 className="text-3xl font-black text-rose-600">Admin Panel</h1>
          <p className="text-gray-500 font-bold mt-2">Maman Louise v1.0</p>
        </div>

        <nav className="flex-1 p-6 space-y-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xl font-bold transition-all ${activeTab === 'overview' ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' : 'text-gray-600 hover:bg-rose-50 hover:text-rose-600'}`}
          >
            <LayoutDashboard className="w-6 h-6" /> Vue d&apos;ensemble
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' : 'text-gray-600 hover:bg-rose-50 hover:text-rose-600'}`}
          >
            <ShoppingBag className="w-6 h-6" /> Commandes
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xl font-bold transition-all ${activeTab === 'appointments' ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' : 'text-gray-600 hover:bg-rose-50 hover:text-rose-600'}`}
          >
            <Calendar className="w-6 h-6" /> Rendez-vous
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xl font-bold transition-all ${activeTab === 'clients' ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' : 'text-gray-600 hover:bg-rose-50 hover:text-rose-600'}`}
          >
            <Users className="w-6 h-6" /> Clients
          </button>
        </nav>

        <div className="p-8 border-t border-gray-100">
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
            <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center text-rose-600 font-black">AD</div>
            <div>
              <p className="font-bold text-gray-900">Maman Louise</p>
              <p className="text-gray-500">Propriétaire</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-black text-gray-900 capitalize">{activeTab.replace('_', ' ')}</h2>
            <p className="text-xl text-gray-500 font-medium">Bon retour, voici ce qui se passe aujourd&apos;hui.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="bg-white border-none rounded-2xl py-3 pl-12 pr-6 text-lg shadow-sm focus:ring-2 focus:ring-rose-500 w-80"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            </div>
          </div>
        </header>

        {data.error && (
          <div className="mb-8 p-6 bg-red-50 border-2 border-red-100 rounded-[2rem] text-red-600">
            <p className="font-black text-2xl">Oups ! Une erreur est survenue.</p>
            <p className="text-xl font-bold">{data.error}</p>
            <p className="mt-4 font-medium italic">Note : Assurez-vous que la base de données est accessible.</p>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard
                title="Ventes Totales"
                value={`${data.stats.totalSales} $`}
                icon={<DollarSign className="w-8 h-8" />}
                trend="+12% vs mois dernier"
                color="bg-green-500"
              />
              <StatCard
                title="Commandes"
                value={data.stats.pendingOrders.toString()}
                icon={<Package className="w-8 h-8" />}
                trend="En attente de traitement"
                color="bg-amber-500"
              />
              <StatCard
                title="RDV Aujourd'hui"
                value={data.stats.todayAppointments.toString()}
                icon={<Calendar className="w-8 h-8" />}
                trend="Planning du jour"
                color="bg-blue-500"
              />
              <StatCard
                title="Clients"
                value={data.stats.totalClients.toString()}
                icon={<Users className="w-8 h-8" />}
                trend="Total enregistrés"
                color="bg-purple-500"
              />
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-2xl font-black text-gray-900">Dernières Commandes</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-rose-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Voir tout <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 font-bold text-lg uppercase tracking-wider">
                    <tr>
                      <th className="px-8 py-6">ID</th>
                      <th className="px-8 py-6">Client</th>
                      <th className="px-8 py-6">Total</th>
                      <th className="px-8 py-6">Statut</th>
                      <th className="px-8 py-6">Date</th>
                      <th className="px-8 py-6">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {data.orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-6 font-bold text-gray-600">#{order.id.slice(-4)}</td>
                        <td className="px-8 py-6">
                          <p className="font-black text-gray-900">{order.client.nom}</p>
                          <p className="text-gray-500 font-medium">{order.client.telephone}</p>
                        </td>
                        <td className="px-8 py-6 text-xl font-black text-rose-600">{order.total} $</td>
                        <td className="px-8 py-6">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-8 py-6 text-gray-500 font-bold">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-8 py-6">
                          <select
                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                            value={order.status}
                            className="bg-gray-100 border-none rounded-xl px-4 py-2 font-bold focus:ring-2 focus:ring-rose-500"
                          >
                            <option value="EN_ATTENTE">En attente</option>
                            <option value="PAYÉ">Payé</option>
                            <option value="LIVRÉ">Livré</option>
                            <option value="ANNULÉ">Annulé</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
           <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
              {/* Full Orders Table Implementation */}
              <div className="p-8 border-b border-gray-100">
                <h3 className="text-2xl font-black text-gray-900">Historique des Commandes</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 font-bold text-lg uppercase tracking-wider">
                    <tr>
                      <th className="px-8 py-6">ID</th>
                      <th className="px-8 py-6">Client</th>
                      <th className="px-8 py-6">Type Paiement</th>
                      <th className="px-8 py-6">Total</th>
                      <th className="px-8 py-6">Statut</th>
                      <th className="px-8 py-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {data.orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-6 font-bold text-gray-600">#{order.id.slice(-8)}</td>
                        <td className="px-8 py-6">
                          <p className="font-black text-gray-900">{order.client.nom}</p>
                          <p className="text-gray-500 font-medium">{order.client.telephone}</p>
                        </td>
                        <td className="px-8 py-6 font-bold text-gray-700">{order.type_paiement}</td>
                        <td className="px-8 py-6 text-xl font-black text-rose-600">{order.total} $</td>
                        <td className="px-8 py-6">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex gap-2">
                             <button onClick={() => handleStatusUpdate(order.id, 'PAYÉ')} className="p-2 text-green-600 hover:bg-green-50 rounded-xl"><CheckCircle2 className="w-6 h-6" /></button>
                             <button onClick={() => handleStatusUpdate(order.id, 'ANNULÉ')} className="p-2 text-red-600 hover:bg-red-50 rounded-xl"><Clock className="w-6 h-6" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
        )}

        {activeTab === 'appointments' && (
           <div className="grid grid-cols-1 gap-8">
              {data.appointments.map((apt) => (
                <div key={apt.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div className="bg-blue-100 p-6 rounded-3xl text-blue-600">
                      <Calendar className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-gray-900">{apt.client.nom}</p>
                      <p className="text-xl text-gray-500 font-bold">{apt.motif}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-rose-600">{apt.heure}</p>
                    <p className="text-xl text-gray-500 font-bold">{new Date(apt.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
           </div>
        )}

        {activeTab === 'clients' && (
           <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 font-bold text-lg uppercase tracking-wider">
                    <tr>
                      <th className="px-8 py-6">Nom</th>
                      <th className="px-8 py-6">Téléphone</th>
                      <th className="px-8 py-6">Ville</th>
                      <th className="px-8 py-6">Commandes</th>
                      <th className="px-8 py-6">RDVs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {data.clients.map((client) => (
                      <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-6 font-black text-gray-900">{client.nom}</td>
                        <td className="px-8 py-6 font-bold text-gray-600">{client.telephone}</td>
                        <td className="px-8 py-6 font-bold text-gray-600">{client.ville || 'Non précisé'}</td>
                        <td className="px-8 py-6">
                           <span className="bg-rose-100 text-rose-600 px-4 py-2 rounded-full font-black">{client._count.commandes}</span>
                        </td>
                        <td className="px-8 py-6">
                           <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-black">{client._count.rendezVous}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
        )}
      </main>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color: string;
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:shadow-xl hover:shadow-gray-200/50 transition-all">
      <div className="flex justify-between items-start mb-6">
        <div className={`${color} p-4 rounded-2xl text-white shadow-lg`}>
          {icon}
        </div>
        <TrendingUp className="w-6 h-6 text-green-500" />
      </div>
      <div>
        <p className="text-gray-500 font-bold text-lg mb-1">{title}</p>
        <h4 className="text-4xl font-black text-gray-900 mb-2">{value}</h4>
        <p className="text-gray-400 font-medium">{trend}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    EN_ATTENTE: 'bg-amber-100 text-amber-600',
    PAYÉ: 'bg-green-100 text-green-600',
    LIVRÉ: 'bg-blue-100 text-blue-600',
    ANNULÉ: 'bg-red-100 text-red-600',
  };

  return (
    <span className={`px-4 py-2 rounded-full font-black text-sm uppercase tracking-wider ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status.replace('_', ' ')}
    </span>
  );
}
