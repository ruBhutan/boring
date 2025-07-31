import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Badge } from '../../ui/badge';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

interface Tour {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  maxGroupSize: number;
  difficulty: string;
  bestSeason: string;
  includes: string[];
  excludes: string[];
  isActive: boolean;
}

const TourManagement: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 0,
    price: 0,
    category: '',
    imageUrl: '',
    highlights: '',
    maxGroupSize: 12,
    difficulty: 'Moderate',
    bestSeason: 'Spring',
    includes: '',
    excludes: '',
    isActive: true
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await fetch('/api/tours');
      const data = await response.json();
      setTours(data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tourData = {
      ...formData,
      highlights: formData.highlights.split(',').map(h => h.trim()),
      includes: formData.includes.split(',').map(i => i.trim()),
      excludes: formData.excludes.split(',').map(e => e.trim()),
    };

    try {
      const url = editingTour ? `/api/tours/${editingTour.id}` : '/api/tours';
      const method = editingTour ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tourData)
      });

      if (response.ok) {
        fetchTours();
        resetForm();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error('Error saving tour:', error);
    }
  };

  const handleEdit = (tour: Tour) => {
    setEditingTour(tour);
    setFormData({
      name: tour.name,
      description: tour.description,
      duration: tour.duration,
      price: tour.price,
      category: tour.category,
      imageUrl: tour.imageUrl,
      highlights: tour.highlights.join(', '),
      maxGroupSize: tour.maxGroupSize,
      difficulty: tour.difficulty,
      bestSeason: tour.bestSeason,
      includes: tour.includes.join(', '),
      excludes: tour.excludes.join(', '),
      isActive: tour.isActive
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this tour?')) {
      try {
        const response = await fetch(`/api/tours/${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchTours();
        }
      } catch (error) {
        console.error('Error deleting tour:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      duration: 0,
      price: 0,
      category: '',
      imageUrl: '',
      highlights: '',
      maxGroupSize: 12,
      difficulty: 'Moderate',
      bestSeason: 'Spring',
      includes: '',
      excludes: '',
      isActive: true
    });
    setEditingTour(null);
  };

  if (isLoading) {
    return <div>Loading tours...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Tour Management</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Tour
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingTour ? 'Edit Tour' : 'Add New Tour'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Tour Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cultural">Cultural</SelectItem>
                        <SelectItem value="Adventure">Adventure</SelectItem>
                        <SelectItem value="Luxury">Luxury</SelectItem>
                        <SelectItem value="Spiritual">Spiritual</SelectItem>
                        <SelectItem value="Photography">Photography</SelectItem>
                        <SelectItem value="Cycling">Cycling</SelectItem>
                        <SelectItem value="Wellness">Wellness</SelectItem>
                        <SelectItem value="Pilgrimage">Pilgrimage</SelectItem>
                        <SelectItem value="Birdwatching">Birdwatching</SelectItem>
                      </SelectContent>
                    </Select>
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

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration (days)</label>
                    <Input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price (USD)</label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Max Group Size</label>
                    <Input
                      type="number"
                      value={formData.maxGroupSize}
                      onChange={(e) => setFormData({...formData, maxGroupSize: parseInt(e.target.value)})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Difficulty</label>
                    <Select value={formData.difficulty} onValueChange={(value) => setFormData({...formData, difficulty: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Challenging">Challenging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Best Season</label>
                    <Select value={formData.bestSeason} onValueChange={(value) => setFormData({...formData, bestSeason: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Spring">Spring</SelectItem>
                        <SelectItem value="Summer">Summer</SelectItem>
                        <SelectItem value="Autumn">Autumn</SelectItem>
                        <SelectItem value="Winter">Winter</SelectItem>
                        <SelectItem value="Year-round">Year-round</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Highlights (comma-separated)</label>
                  <Textarea
                    value={formData.highlights}
                    onChange={(e) => setFormData({...formData, highlights: e.target.value})}
                    placeholder="Tiger's Nest Monastery, Traditional villages, Mountain views"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Includes (comma-separated)</label>
                  <Textarea
                    value={formData.includes}
                    onChange={(e) => setFormData({...formData, includes: e.target.value})}
                    placeholder="Accommodation, Meals, Guide, Transportation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Excludes (comma-separated)</label>
                  <Textarea
                    value={formData.excludes}
                    onChange={(e) => setFormData({...formData, excludes: e.target.value})}
                    placeholder="International flights, Travel insurance, Personal expenses"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingTour ? 'Update Tour' : 'Create Tour'}
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
              <TableHead>Category</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tours.map((tour) => (
              <TableRow key={tour.id}>
                <TableCell className="font-medium">{tour.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{tour.category}</Badge>
                </TableCell>
                <TableCell>{tour.duration} days</TableCell>
                <TableCell>${tour.price}</TableCell>
                <TableCell>
                  <Badge variant={tour.isActive ? "default" : "destructive"}>
                    {tour.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(tour)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(tour.id)}>
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

export default TourManagement;