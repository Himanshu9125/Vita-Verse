import React, { useState, useEffect } from "react";
import { useDoctorContext } from "../context/doctorContext";
import axios from "axios";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorformData] = useDoctorContext();
  const navigate = useNavigate();

  const fetchDoctorBlogs = async () => {
    if (!doctorformData?.email) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/doctor/${doctorformData.email}`
      );

      if (res.status === 200) {
        setBlogs(res.data);
      } else {
        setError("Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("An error occurred while fetching your blogs");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDoctorBlogs();
  }, [doctorformData?.email]);

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }
    console.log(blogId);

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/doctor/blog/${blogId}`
      );

      if (res.status === 200) {
        // Remove the deleted blog from state
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
        alert("Blog deleted successfully");
      } else {
        alert("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("An error occurred while deleting the blog");
    }
  };

  const handleView = (blog) => {
    navigate(`/blog/${blog._id}`, { state: { blogData: blog } });
  };

  const handleEdit = (blog) => {
    navigate(`/doctor/edit-blog/${blog._id}`, { state: { blogData: blog } });
  };

  const truncateText = (text, wordCount) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(" ") + "...";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md text-red-600 text-center my-4">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Blogs</h1>
        <button
          onClick={() => navigate("/doctor/BlogForm")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Pencil size={16} />
          Write New Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <h3 className="text-xl font-medium text-gray-600">
            You haven't written any blogs yet
          </h3>
          <p className="text-gray-500 mt-2 mb-6">
            Share your medical expertise with patients by writing your first
            blog
          </p>
          <button
            onClick={() => navigate("/doctor/BlogForm")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            Start Writing
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-blue-700 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {truncateText(blog.content, 30)}
                </p>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString()
                      : ""}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(blog)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      title="View blog"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                      title="Edit blog"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                      title="Delete blog"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
