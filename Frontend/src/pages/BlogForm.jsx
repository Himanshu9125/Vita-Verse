import React, { useEffect, useState } from "react";
import { useDoctorContext } from "../context/doctorContext";
import axios from "axios";

const BlogForm = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [doctorformData] = useDoctorContext();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      alert("Both fields are required!");
      return;
    }

    setIsSubmitting(true);

    const blogData = {
      title: form.title,
      content: form.content,
      name: doctorformData.firstName + " " + doctorformData.lastName,
      email: doctorformData.email,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/doctor/createblog`,
        blogData
      );

      if (res.status === 200 || res.status === 201) {
        // Add the new blog to the existing blogs
        setBlogs([...blogs, res.data]);
        setForm({ title: "", content: "" });
        alert("Blog posted successfully!");
      } else {
        alert(res.data.message || "Error submitting blog");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/doctor/${doctorformData.email}`
      );

      if (res.status === 200) {
        setBlogs(res.data);
      } else {
        console.error("Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Error in showing blogs:", error);
    }
  };

  useEffect(() => {
    if (doctorformData?.email) {
      fetchBlogs();
    }
  }, [doctorformData?.email]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <textarea
          name="content"
          placeholder="Blog Content"
          rows={5}
          value={form.content}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Posting..." : "Add Blog"}
        </button>
      </form>

      <div className="mt-10 space-y-4">
        <h3 className="text-xl font-bold">Your Blogs</h3>

        {blogs.length === 0 && (
          <p className="text-gray-500">No blogs added yet.</p>
        )}

        {blogs.map((blog, index) => (
          <div
            key={blog._id || index}
            className="border p-4 rounded shadow-sm bg-white"
          >
            <h3 className="text-xl font-semibold text-blue-700">
              {blog.title}
            </h3>
            <p className="text-gray-700 mt-2">{blog.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              By:{" "}
              {blog.name ||
                `${doctorformData.firstName} ${doctorformData.lastName}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogForm;
