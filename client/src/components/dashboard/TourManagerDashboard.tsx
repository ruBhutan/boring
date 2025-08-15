import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Edit, Plus, Users, UserCheck } from "lucide-react";
import type { Tour } from "@shared/schema";

export default function TourManagerDashboard() {
  const [tab, setTab] = useState("tours");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-brand-primary">Tour Management Dashboard</h1>
        <div className="text-sm text-brand-text/70">
          Manage all aspects of your tourism business
        </div>
      </div>
      
      <Tabs value={tab} onValueChange={setTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-brand-light">
          <TabsTrigger value="tours" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">Tours</TabsTrigger>
          <TabsTrigger value="festivals" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">Festivals</TabsTrigger>
          <TabsTrigger value="hotels" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">Hotels</TabsTrigger>
          <TabsTrigger value="flights" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">Flights</TabsTrigger>
          <TabsTrigger value="itineraries" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">Itineraries</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tours">
          <ToursCrud />
        </TabsContent>
        <TabsContent value="festivals">
          <FestivalsCrud />
        </TabsContent>
        <TabsContent value="hotels">
          <HotelsCrud />
        </TabsContent>
        <TabsContent value="flights">
          <FlightsCrud />
        </TabsContent>
        <TabsContent value="itineraries">
          <ItinerariesCrud />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// --- TOURS CRUD (Real API Integration) ---
function ToursCrud() {
  const queryClient = useQueryClient();
  const { data: tours = [], isLoading } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editTour, setEditTour] = useState<Tour | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    duration: 1,
    category: "",
    imageUrl: "",
    featured: false
  });

  const saveMutation = useMutation({
    mutationFn: async (tour: Partial<Tour>) => {
      if (editTour) {
        const response = await fetch(`/api/tours/${editTour.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tour)
        });
        if (!response.ok) throw new Error('Failed to update tour');
      } else {
        const response = await fetch(`/api/tours`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tour)
        });
        if (!response.ok) throw new Error('Failed to create tour');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["/api/tours"]);
      setModalOpen(false);
      setEditTour(null);
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/tours/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error('Failed to delete tour');
    },
    onSuccess: () => queryClient.invalidateQueries(["/api/tours"])
  });

  function resetForm() {
    setForm({ name: "", description: "", price: 0, duration: 1, category: "", imageUrl: "", featured: false });
  }

  function openAdd() {
    setEditTour(null);
    resetForm();
    setModalOpen(true);
  }

  function openEdit(tour: Tour) {
    setEditTour(tour);
    setForm({
      name: tour.name,
      description: tour.description,
      price: tour.price,
      duration: tour.duration,
      category: tour.category,
      imageUrl: tour.imageUrl || "",
      featured: tour.featured || false
    });
    setModalOpen(true);
  }

  function handleChange(e: any) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  }

  function handleSave() {
    saveMutation.mutate(form);
  }

  return (
    <CrudTable
      title="Tours & Packages"
      items={tours}
      isLoading={isLoading}
      onAdd={openAdd}
      onEdit={openEdit}
      onDelete={tour => deleteMutation.mutate(tour.id)}
      columns={[
        { label: "Name", key: "name" },
        { label: "Category", key: "category" },
        { label: "Price", key: "price", render: v => `$${v}` },
        { label: "Duration", key: "duration", render: v => `${v} days` },
        { label: "Featured", key: "featured", render: v => v ? "Yes" : "No" },
      ]}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      form={form}
      handleChange={handleChange}
      handleSave={handleSave}
      isEditing={!!editTour}
      isSaving={saveMutation.isPending}
      formFields={[
        { name: "name", label: "Tour Name", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "category", label: "Category", type: "select", options: ["Cultural", "Adventure", "Luxury", "Spiritual", "Festival"], required: true },
        { name: "price", label: "Price (USD)", type: "number", required: true },
        { name: "duration", label: "Duration (days)", type: "number", required: true },
        { name: "imageUrl", label: "Image URL", type: "text" },
        { name: "featured", label: "Featured Tour", type: "checkbox" }
      ]}
    />
  );
}

// --- FESTIVALS CRUD ---
function FestivalsCrud() {
  const [items, setItems] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [form, setForm] = useState({ name: "", date: "", location: "", description: "" });
  
  function openAdd() { setEditItem(null); setForm({ name: "", date: "", location: "", description: "" }); setModalOpen(true); }
  function openEdit(item: any) { setEditItem(item); setForm(item); setModalOpen(true); }
  function handleChange(e: any) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function handleSave() {
    if (editItem) {
      setItems(items.map(i => (i === editItem ? { ...form, id: editItem.id } : i)));
    } else {
      setItems([...items, { ...form, id: Date.now() }]);
    }
    setModalOpen(false);
  }
  function handleDelete(item: any) { setItems(items.filter(i => i.id !== item.id)); }
  
  return (
    <CrudTable
      title="Festivals & Events"
      items={items}
      isLoading={false}
      onAdd={openAdd}
      onEdit={openEdit}
      onDelete={handleDelete}
      columns={[
        { label: "Name", key: "name" },
        { label: "Date", key: "date" },
        { label: "Location", key: "location" },
      ]}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      form={form}
      handleChange={handleChange}
      handleSave={handleSave}
      isEditing={!!editItem}
      isSaving={false}
      formFields={[
        { name: "name", label: "Festival Name", type: "text", required: true },
        { name: "date", label: "Date", type: "date", required: true },
        { name: "location", label: "Location", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea" }
      ]}
    />
  );
}

// --- HOTELS CRUD ---
function HotelsCrud() {
  const [items, setItems] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [form, setForm] = useState({ name: "", location: "", price: 0, type: "", rating: 5 });
  
  function openAdd() { setEditItem(null); setForm({ name: "", location: "", price: 0, type: "", rating: 5 }); setModalOpen(true); }
  function openEdit(item: any) { setEditItem(item); setForm(item); setModalOpen(true); }
  function handleChange(e: any) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function handleSave() {
    if (editItem) {
      setItems(items.map(i => (i === editItem ? { ...form, id: editItem.id } : i)));
    } else {
      setItems([...items, { ...form, id: Date.now() }]);
    }
    setModalOpen(false);
  }
  function handleDelete(item: any) { setItems(items.filter(i => i.id !== item.id)); }
  
  return (
    <CrudTable
      title="Hotels & Accommodations"
      items={items}
      isLoading={false}
      onAdd={openAdd}
      onEdit={openEdit}
      onDelete={handleDelete}
      columns={[
        { label: "Name", key: "name" },
        { label: "Location", key: "location" },
        { label: "Type", key: "type" },
        { label: "Price", key: "price", render: v => `$${v}/night` },
        { label: "Rating", key: "rating", render: v => `${v}★` },
      ]}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      form={form}
      handleChange={handleChange}
      handleSave={handleSave}
      isEditing={!!editItem}
      isSaving={false}
      formFields={[
        { name: "name", label: "Hotel Name", type: "text", required: true },
        { name: "location", label: "Location", type: "text", required: true },
        { name: "type", label: "Type", type: "select", options: ["Luxury", "Boutique", "Homestay", "Farmstay"], required: true },
        { name: "price", label: "Price per night (USD)", type: "number", required: true },
        { name: "rating", label: "Rating (1-5)", type: "number", min: 1, max: 5, required: true }
      ]}
    />
  );
}

// --- FLIGHTS CRUD ---
function FlightsCrud() {
  const [items, setItems] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [form, setForm] = useState({ flightNo: "", airline: "", from: "", to: "", price: 0, duration: "" });
  
  function openAdd() { setEditItem(null); setForm({ flightNo: "", airline: "", from: "", to: "", price: 0, duration: "" }); setModalOpen(true); }
  function openEdit(item: any) { setEditItem(item); setForm(item); setModalOpen(true); }
  function handleChange(e: any) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function handleSave() {
    if (editItem) {
      setItems(items.map(i => (i === editItem ? { ...form, id: editItem.id } : i)));
    } else {
      setItems([...items, { ...form, id: Date.now() }]);
    }
    setModalOpen(false);
  }
  function handleDelete(item: any) { setItems(items.filter(i => i.id !== item.id)); }
  
  return (
    <CrudTable
      title="Flight Management"
      items={items}
      isLoading={false}
      onAdd={openAdd}
      onEdit={openEdit}
      onDelete={handleDelete}
      columns={[
        { label: "Flight No", key: "flightNo" },
        { label: "Airline", key: "airline" },
        { label: "Route", key: "route", render: (_, item) => `${item.from} → ${item.to}` },
        { label: "Duration", key: "duration" },
        { label: "Price", key: "price", render: v => `$${v}` },
      ]}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      form={form}
      handleChange={handleChange}
      handleSave={handleSave}
      isEditing={!!editItem}
      isSaving={false}
      formFields={[
        { name: "flightNo", label: "Flight Number", type: "text", required: true },
        { name: "airline", label: "Airline", type: "text", required: true },
        { name: "from", label: "From", type: "text", required: true },
        { name: "to", label: "To", type: "text", required: true },
        { name: "duration", label: "Duration", type: "text", required: true },
        { name: "price", label: "Price (USD)", type: "number", required: true }
      ]}
    />
  );
}

// --- ITINERARIES CRUD WITH ASSIGNMENT ---
function ItinerariesCrud() {
  const [items, setItems] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [assignItem, setAssignItem] = useState<any | null>(null);
  const [form, setForm] = useState({ name: "", tourist: "", startDate: "", endDate: "", status: "pending" });
  const [assignForm, setAssignForm] = useState({ guide: "", driver: "" });
  
  function openAdd() { setEditItem(null); setForm({ name: "", tourist: "", startDate: "", endDate: "", status: "pending" }); setModalOpen(true); }
  function openEdit(item: any) { setEditItem(item); setForm(item); setModalOpen(true); }
  function openAssign(item: any) { setAssignItem(item); setAssignForm({ guide: item.guide || "", driver: item.driver || "" }); setAssignModalOpen(true); }
  function handleChange(e: any) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function handleAssignChange(e: any) { setAssignForm({ ...assignForm, [e.target.name]: e.target.value }); }
  
  function handleSave() {
    if (editItem) {
      setItems(items.map(i => (i === editItem ? { ...form, id: editItem.id } : i)));
    } else {
      setItems([...items, { ...form, id: Date.now() }]);
    }
    setModalOpen(false);
  }
  
  function handleAssign() {
    if (assignItem) {
      setItems(items.map(i => (i === assignItem ? { ...i, ...assignForm } : i)));
    }
    setAssignModalOpen(false);
  }
  
  function handleDelete(item: any) { setItems(items.filter(i => i.id !== item.id)); }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-primary">Itineraries & Assignments</h2>
        <Button onClick={openAdd} className="btn-brand-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Itinerary
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tourist</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Guide</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {items.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-500">No itineraries found</td></tr>
              ) : items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 font-medium">{item.name}</td>
                  <td className="px-4 py-2">{item.tourist}</td>
                  <td className="px-4 py-2">{item.guide || <span className="text-gray-400">Unassigned</span>}</td>
                  <td className="px-4 py-2">{item.driver || <span className="text-gray-400">Unassigned</span>}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.status === 'completed' ? 'bg-green-100 text-green-800' :
                      item.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEdit(item)}><Edit className="w-4 h-4" /></Button>
                    <Button size="sm" className="btn-brand-secondary" onClick={() => openAssign(item)}><UserCheck className="w-4 h-4" /></Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(item)}><Trash className="w-4 h-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      
      {/* Create/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit Itinerary" : "Create Itinerary"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Itinerary Name</Label>
              <Input name="name" value={form.name} onChange={handleChange} />
            </div>
            <div>
              <Label>Tourist Name</Label>
              <Input name="tourist" value={form.tourist} onChange={handleChange} />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input name="startDate" type="date" value={form.startDate} onChange={handleChange} />
            </div>
            <div>
              <Label>End Date</Label>
              <Input name="endDate" type="date" value={form.endDate} onChange={handleChange} />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Assignment Modal */}
      <Dialog open={assignModalOpen} onOpenChange={setAssignModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Guide & Driver</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Assign Guide</Label>
              <Select value={assignForm.guide} onValueChange={(value) => setAssignForm({ ...assignForm, guide: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a guide" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="guide1">Tenzin Norbu (Senior Guide)</SelectItem>
                  <SelectItem value="guide2">Karma Wangchuk (Cultural Expert)</SelectItem>
                  <SelectItem value="guide3">Pema Lhamo (Adventure Guide)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Assign Driver</Label>
              <Select value={assignForm.driver} onValueChange={(value) => setAssignForm({ ...assignForm, driver: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a driver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="driver1">Sonam Dorji (Mountain Routes)</SelectItem>
                  <SelectItem value="driver2">Ugyen Tshering (City Tours)</SelectItem>
                  <SelectItem value="driver3">Kinley Wangdi (Long Distance)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button onClick={handleAssign} className="btn-brand-primary">Assign</Button>
            <Button variant="outline" onClick={() => setAssignModalOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- GENERIC CRUD TABLE COMPONENT ---
function CrudTable({
  title,
  items,
  isLoading,
  onAdd,
  onEdit,
  onDelete,
  columns,
  modalOpen,
  setModalOpen,
  form,
  handleChange,
  handleSave,
  isEditing,
  isSaving,
  formFields = []
}: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-primary">{title}</h2>
        <Button onClick={onAdd} className="btn-brand-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add {title.split(' ')[0].slice(0, -1)}
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col: any) => (
                  <th key={col.key} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{col.label}</th>
                ))}
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={columns.length + 1} className="text-center py-8">Loading...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={columns.length + 1} className="text-center py-8 text-gray-500">No {title.toLowerCase()} found</td></tr>
              ) : items.map((item: any, idx: number) => (
                <tr key={item.id || idx}>
                  {columns.map((col: any) => (
                    <td key={col.key} className="px-4 py-2 font-medium">
                      {col.render ? col.render(item[col.key], item) : item[col.key]}
                    </td>
                  ))}
                  <td className="px-4 py-2 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => onEdit(item)}><Edit className="w-4 h-4" /></Button>
                    <Button size="sm" variant="destructive" onClick={() => onDelete(item)}><Trash className="w-4 h-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? `Edit ${title.split(' ')[0].slice(0, -1)}` : `Add ${title.split(' ')[0].slice(0, -1)}`}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {formFields.map((field: any) => (
              <div key={field.name}>
                <Label>{field.label}</Label>
                {field.type === 'textarea' ? (
                  <Textarea name={field.name} value={form[field.name]} onChange={handleChange} required={field.required} />
                ) : field.type === 'select' ? (
                  <Select value={form[field.name]} onValueChange={(value) => handleChange({ target: { name: field.name, value } })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option: string) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.type === 'checkbox' ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={field.name}
                      checked={form[field.name]}
                      onChange={handleChange}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{field.label}</span>
                  </div>
                ) : (
                  <Input
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    min={field.min}
                    max={field.max}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter className="mt-4">
            <Button onClick={handleSave} disabled={isSaving} className="btn-brand-primary">
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}