import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Members from "./Members";
import Payments from "./Payments";
import Trainers from "./Trainers";
import AddTrainerModal from "../components/AddTrainerModal";
import { toast } from "react-hot-toast";

const initialTrainers = [
  { id: 1, fullName: "John Smith", position: "Senior Trainer", phoneNo: "1234567890", timeToWork: "9 AM to 5 PM" },
  { id: 2, fullName: "Sarah Johnson", position: "Yoga Instructor", phoneNo: "2345678901", timeToWork: "10 AM to 6 PM" },
  { id: 3, fullName: "Mike Wilson", position: "Personal Trainer", phoneNo: "3456789012", timeToWork: "8 AM to 4 PM" }
];

const initialUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", joinDate: "2025-01-15", status: "Active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", joinDate: "2025-02-01", status: "Active" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", joinDate: "2025-02-10", status: "Inactive" },
  { id: "4", name: "Sarah Wilson", email: "sarah@example.com", joinDate: "2025-02-15", status: "Active" },
  { id: "5", name: "Tom Brown", email: "tom@example.com", joinDate: "2025-02-20", status: "Active" }
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddTrainer, setShowAddTrainer] = useState(false);
  const [trainers, setTrainers] = useState(initialTrainers);
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [newTrainer, setNewTrainer] = useState({
    fullName: "",
    position: "",
    phoneNo: "",
    timeToWork: ""
  });

  const stats = {
    membersCount: users.length,
    trainersCount: trainers.length,
    totalRevenue: 2500
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTrainer = (e) => {
    e.preventDefault();

    const newTrainerWithId = {
      id: Date.now(),
      ...newTrainer
    };

    setTrainers([...trainers, newTrainerWithId]);
    setShowAddTrainer(false);
    setNewTrainer({ fullName: "", position: "", phoneNo: "", timeToWork: "" });
    toast.success("Trainer added successfully!");
  };

  const handleTrainerChange = (field, value) => {
    setNewTrainer((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    setUsers(users.filter((user) => user.id !== id));
    toast.success("User deleted successfully!");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingUser) return;

    setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
    setEditingUser(null);
    toast.success("User updated successfully!");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>

        {activeTab === "dashboard" && (
          <div>
            <p>Total Members: {stats.membersCount}</p>
            <p>Total Trainers: {stats.trainersCount}</p>
            <p>Total Revenue: ${stats.totalRevenue}</p>
          </div>
        )}

        {activeTab === "members" && <Members />}
        {activeTab === "payment" && <Payments />}
        {activeTab === "trainers" && (
          <Trainers trainers={trainers} onAddTrainer={() => setShowAddTrainer(true)} />
        )}

        <AddTrainerModal
          show={showAddTrainer}
          onClose={() => setShowAddTrainer(false)}
          onSubmit={handleAddTrainer}
          trainer={newTrainer}
          onTrainerChange={handleTrainerChange}
        />
      </div>
    </div>
  );
}

export default Dashboard;
