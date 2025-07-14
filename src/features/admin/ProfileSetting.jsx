import React, { useState, useEffect } from 'react';
import Card from "../../components/ui/Card";
import { UserCog } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, fetchPlatformFee, updatePlatformFee } from '../../store/admin/adminSlice';
import toast from 'react-hot-toast';
import UpdateFeeModal from '../../components/modals/UpdateFeeModal';
import ChangePasswordModal from '../../components/modals/ChangePasswordModal';

export default function ProfileSetting() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { platformFee } = useSelector((state) => state.admin);

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    file: null,
  });
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phoneNumber: user.phoneNumber || '',
        file: null,
      });
    }
    dispatch(fetchPlatformFee());
  }, [user, dispatch]);

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setProfileData((prevData) => ({
        ...prevData,
        file: files[0],
      }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile(profileData)).unwrap();
      toast.success('Profil berhasil diperbarui!');
    } catch (err) {
      toast.error(`Gagal memperbarui profil: ${err.message || err}`);
    }
  };

  const handleUpdateFeeClick = () => {
    setIsFeeModalOpen(true);
  };

  const handleConfirmUpdateFee = (newFeePercentage) => {
    dispatch(updatePlatformFee(newFeePercentage));
  };

  return (
    <>
      {/* Header Setting Account */}
      <div className="flex items-center gap-4 mb-6">
        <UserCog className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Pengaturan Akun</h1>
      </div>
      {/* Informasi Profil Admin */}
      <Card className="mb-6 p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold text-slate-700 mb-4 border-b border-gray-200 pb-2">Account information</h3>
        <form onSubmit={handleSubmitProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Depan</label>
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Belakang</label>
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
            <input
              type="text"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Foto Profil</label>
            <input
              type="file"
              name="file"
              onChange={handleProfileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Update Account
          </button>
        </form>
      </Card>

      <Card className="p-6 bg-white shadow-md rounded-lg mt-10 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-slate-700">User Settings</h3>
            <p className="text-sm text-gray-600 mt-1">Change your password</p>
          </div>
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300"
          >
            User Settings -&gt;
          </button>
        </div>
      </Card>

      {/* Setting Account Fee Card */}
      <Card className="p-6 bg-white shadow-md rounded-lg mt-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-slate-700">Setting Account Fee</h3>
            <p className="text-sm text-gray-600 mt-1">Setting account fee.</p>
          </div>
          <button
            onClick={handleUpdateFeeClick}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300"
          >
            Setting Fee -&gt;
          </button>
        </div>
      </Card>

      {platformFee !== null && (
        <UpdateFeeModal
          isOpen={isFeeModalOpen}
          onClose={() => setIsFeeModalOpen(false)}
          onConfirm={handleConfirmUpdateFee}
          currentFee={platformFee}
        />
      )}

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}
