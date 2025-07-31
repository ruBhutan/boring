import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Badge } from '../../ui/badge';
import { Plus, Edit, Trash2, Star } from 'lucide-react';

interface TourOperator {
  id: number;
  name: string;
  website: string;
  description: string;
  bestFeature: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  logoUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  establishedYear?: number;
  certifications: string[];
  awards: string[];
  isActive: boolean;
}

const TourOperatorManagement: React.FC = () => {
  const [operators, setOperators] = useState<TourOperator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingOperator, setEditingOperator] = useState<TourOperator | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    website: '',
    description: '',
    bestFeature: '',
    specialties: '',
    rating: 5.0,
    reviewCount: 0,
    logoUrl: '',
    contactEmail: '',
    contactPhone: '',
    establishedYear: new Date().getFullYear(),
    certifications: '',
    awards: '',
    isActive: true
  });

  useEffect(() => {
    fetchOperators();
  }, []);

  const fetchOperators = async () => {
    try {
      const response = await fetch('/api/tour-operators');
      const data = await response.json();
      setOperators(data);
    } catch (error) {
      console.error('Error fetching operators:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const operatorData = {
      ...formData,
      specialties: formData.specialties.split(',').map(s => s.trim()),
      certifications: formData.certifications.split(',').map(c => c.trim()),
      awards: formData.awards.split(',').map(a => a.trim()),
    };

    try {
      const url = editingOperator ? `/api/tour-operators/${editingOperator.id}` : '/api/tour-operators';
      const method = editingOperator ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(operatorData)
      });

      if (response.ok) {
        fetchOperators();
        resetForm();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error('Error saving operator:', error);
    }
  };

  const handleEdit = (operator: TourOperator) => {
    setEditingOperator(operator);
    setFormData({
      name: operator.name,
      website: operator.website,
      description: operator.description,
      bestFeature: operator.bestFeature,
      specialties: operator.specialties.join(', '),
      rating: operator.rating,
      reviewCount: operator.reviewCount,
      logoUrl: operator.logoUrl || '',
      contactEmail: operator.contactEmail || '',
      contactPhone: operator.contactPhone || '',
      establishedYear: operator.establishedYear || new Date().getFullYear(),
      certifications: operator.certifications.join(', '),
      awards: operator.awards.join(', '),
      isActive: operator.isActive
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this tour operator?')) {
      try {
        const response = await fetch(`/api/tour-operators/${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchOperators();
        }
      } catch (error) {
        console.error('Error deleting operator:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      website: '',
      description: '',
      bestFeature: '',
      specialties: '',
      rating: 5.0,
      reviewCount: 0,
      logoUrl: '',
      contactEmail: '',
      contactPhone: '',
      establishedYear: new Date().getFullYear(),
      certifications: '',
      awards: '',
      isActive: true
    });
    setEditingOperator(null);
  };

  if (isLoading) {
    return <div>Loading tour operators...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Tour Operator Management</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Operator
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingOperator ? 'Edit Tour Operator' : 'Add New Tour Operator'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Company Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Website</label>
                    <Input
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      placeholder="www.example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Best Feature</label>
                  <Input
                    value={formData.bestFeature}
                    onChange={(e) => setFormData({...formData, bestFeature: e.target.value})}
                    placeholder="What makes this operator special"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Specialties (comma-separated)</label>
                  <Input
                    value={formData.specialties}
                    onChange={(e) => setFormData({...formData, specialties: e.target.value})}
                    placeholder="Cultural tours, Adventure travel, Luxury experiences"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Rating</label>
                    <Input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Review Count</label>
                    <Input
                      type="number"
                      value={formData.reviewCount}
                      onChange={(e) => setFormData({...formData, reviewCount: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Established Year</label>
                    <Input
                      type="number"
                      value={formData.establishedYear}
                      onChange={(e) => setFormData({...formData, establishedYear: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Email</label>
                    <Input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Phone</label>
                    <Input
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Logo URL</label>
                  <Input
                    value={formData.logoUrl}
                    onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
                    placeholder="https://example.com/logo.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Certifications (comma-separated)</label>
                  <Input
                    value={formData.certifications}
                    onChange={(e) => setFormData({...formData, certifications: e.target.value})}
                    placeholder="Tourism Board Licensed, ISO Certified"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Awards (comma-separated)</label>
                  <Input
                    value={formData.awards}
                    onChange={(e) => setFormData({...formData, awards: e.target.value})}
                    placeholder="Best Tour Operator 2023, Excellence Award"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingOperator ? 'Update Operator' : 'Create Operator'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Established</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {operators.map((operator) => (
              <TableRow key={operator.id}>
                <TableCell className="font-medium">{operator.name}</TableCell>
                <TableCell>{operator.website}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {operator.rating} ({operator.reviewCount})
                  </div>
                </TableCell>
                <TableCell>{operator.establishedYear}</TableCell>
                <TableCell>
                  <Badge variant={operator.isActive ? "default" : "destructive"}>
                    {operator.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(operator)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(operator.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TourOperatorManagement;