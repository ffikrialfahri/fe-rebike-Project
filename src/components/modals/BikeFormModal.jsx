import React, { useState, useEffect } from "react";
import Card from "../ui/Card";

export default function BikeFormModal({
  isOpen,
  onClose,
  onSave,
  bikeData,
}) {
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    plateNumber: "",
    brand: "",
    year: "",
    machineCapacity: "",
    transmissionType: "",
    weekdayPricePerDay: "",
    weekendPricePerDay: "",
    stock: "",
  });

  useEffect(() => {
    if (bikeData) {
      setFormData({
        name: bikeData.name || "",
        photoURL: bikeData.photoURL || "",
        plateNumber: bikeData.plateNumber || "",
        brand: bikeData.brand || "",
        year: bikeData.year || "",
        machineCapacity: bikeData.machineCapacity || "",
        transmissionType: bikeData.transmissionType || "",
        weekdayPricePerDay: bikeData.weekdayPricePerDay || "",
        weekendPricePerDay: bikeData.weekendPricePerDay || "",
        stock: bikeData.stock || "",
      });
    } else {
      setFormData({
        name: "",
        photoURL: "",
        plateNumber: "",
        brand: "",
        year: "",
        machineCapacity: "",
        transmissionType: "",
        weekdayPricePerDay: "",
        weekendPricePerDay: "",
        stock: "",
      });
    }
  }, [bikeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Card className="w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          {bikeData ? "Edit Motor" : "Tambah Motor Baru"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Motor</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL Foto</label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Plat Nomor</label>
            <input
              type="text"
              name="plateNumber"
              value={formData.plateNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Merek</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tahun</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Kapasitas Mesin</label>
            <input
              type="text"
              name="machineCapacity"
              value={formData.machineCapacity}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipe Transmisi</label>
            <select
              name="transmissionType"
              value={formData.transmissionType}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Pilih Tipe Transmisi</option>
              <option value="AUTOMATIC">Otomatis</option>
              <option value="MANUAL">Manual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Harga Harian (Weekday)</label>
            <input
              type="number"
              name="weekdayPricePerDay"
              value={formData.weekdayPricePerDay}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Harga Harian (Weekend)</label>
            <input
              type="number"
              name="weekendPricePerDay"
              value={formData.weekendPricePerDay}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stok</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
