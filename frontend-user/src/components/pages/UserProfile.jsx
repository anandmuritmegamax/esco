import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from "../../redux/api/userApi"; // make sure you have this API endpoint
import { toast } from "react-toastify";
import { loginSuccess } from "../../redux/slices/authSlice";

export default function UserProfile() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log("User Info in Profile:", userInfo);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: null,
    avatarPreview: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(
    userInfo?.user?.avatar?.url || "/assets/images/thumb-dummy.jpg"
  );

  const [avatarFile, setAvatarFile] = useState(null);

  const [uploadAvatar, { isLoading: uploading }] = useUploadAvatarMutation();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Handle avatar selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ✅ Submit name/email
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile(formData).unwrap();
      dispatch(loginSuccess({ ...userInfo, user: res.user }));
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err?.data?.message || "Failed to update profile");
    }
  };

  // ✅ Upload avatar (separate)
  const handleAvatarUpload = async () => {
    if (!avatarFile) return alert("Please select an image first!");
    try {
      const base64Avatar = avatarPreview; // Cloudinary API expects base64 data
      const res = await uploadAvatar({ avatar: base64Avatar }).unwrap();
      dispatch(loginSuccess({ ...userInfo, user: res.user }));
      alert("Avatar updated successfully!");
    } catch (err) {
      alert(err?.data?.message || "Failed to upload avatar");
    }
  };

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.user.name || "",
        email: userInfo.user.email || "",
        phone: userInfo.user.phone || "",
        avatar: null,
        avatarPreview: userInfo.user.avatar?.url || "",
      });
    }
  }, [userInfo]);

  //   const handleChange = (e) => {
  //     const { name, value, files } = e.target;
  //     if (name === "avatar" && files.length > 0) {
  //       const file = files[0];
  //       setFormData({
  //         ...formData,
  //         avatar: file,
  //         avatarPreview: URL.createObjectURL(file),
  //       });
  //     } else {
  //       setFormData({ ...formData, [name]: value });
  //     }
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const res = await updateUser(formData).unwrap();
  //       alert("Profile updated successfully!");
  //       // ✅ Update Redux store
  //       dispatch(loginSuccess({ ...userInfo, user: res.user }));
  //     } catch (err) {
  //       alert(err?.data?.message || "Failed to update profile");
  //     }

  //     // try {
  //     //   const data = new FormData();
  //     //   data.append("name", formData.name);
  //     //   data.append("phone", formData.phone);
  //     //   if (formData.avatar) data.append("avatar", formData.avatar);

  //     //   await updateUser(data).unwrap();
  //     //   toast.success("Profile updated successfully!");
  //     // } catch (err) {
  //     //   toast.error(err?.data?.message || "Failed to update profile");
  //     // }
  //   };

  return (
    <div className="login-sec-container">
      <div className="login-sec-info">
        <h1>Your Profile</h1>
        <p>Manage your personal information and preferences.</p>
      </div>

      <div className="login-sec-form">
        <div className="vector-aricraft">
          <img src="/assets/images/aircraft_with_trail.png" alt="Aircraft" />
        </div>
        <div className="logo">
          <a href="/">
            <img src="/assets/images/aayalogo-big.png" alt="Aayo" />
          </a>
        </div>

        <div className="form-flex">
          <div className="form">
            <div className="heading">Profile Details</div>
            <div className="subheading">
              Keep your account details up to date.
            </div>

            {/* Avatar Section */}
            <div className="avatar-upload" style={{ textAlign: "center" }}>
              <img
                src={avatarPreview}
                alt="avatar"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div style={{ marginTop: 10 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleAvatarUpload}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Update Avatar"}
                </button>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit}>
              {/* Avatar Upload */}
              {/* <div className="profile-avatar text-center mb-3">
                <label htmlFor="avatarUpload">
                  <img
                    src={
                      formData.avatarPreview || "/assets/images/thumb-dummy.jpg"
                    }
                    alt="Avatar"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                  />
                </label>
                <input
                  type="file"
                  id="avatarUpload"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                <p style={{ fontSize: "0.9rem", color: "#777" }}>
                  Click image to change
                </p>
              </div> */}

              {/* Name */}
              <div className="input-box">
                <label>Full Name</label>
                <div className="input-flex">
                  <div className="icon">
                    <i className="fa fa-user"></i>
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email (read-only) */}
              <div className="input-box">
                <label>Email Id</label>
                <div className="input-flex">
                  <div className="icon">
                    <img src="/assets/images/icon-email.png" alt="email" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    style={{ background: "#f5f5f5" }}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="input-box">
                <label>Phone</label>
                <div className="input-flex">
                  <div className="icon">
                    <i className="fa fa-phone"></i>
                  </div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-button">
                <input
                  type="submit"
                  className="btn btn-fill"
                  value={isLoading ? "Updating..." : "Update Profile"}
                />
              </div>

              <div className="form-bottom-link">
                <p>
                  Want to change your password?{" "}
                  <span
                    style={{ cursor: "pointer", color: "#007bff" }}
                    onClick={() => navigate("/change-password")}
                  >
                    Click here
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
