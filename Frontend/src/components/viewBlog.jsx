import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Clock, User } from "lucide-react";

const ViewBlog = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(location.state?.blogData || null);
  const [loading, setLoading] = useState(!blog);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If blog data wasn't passed via location state, fetch it
    if (!blog && id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/doctor/blog/${id}`
      );

      if (res.status === 200) {
        setBlog(res.data);
      } else {
        setError("Failed to fetch blog");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      setError("An error occurred while fetching the blog");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h2 className="text-xl font-semibold text-red-500 mb-4">
          {error || "Blog not found"}
        </h2>
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} /> Go back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={goBack}
        className="flex items-center gap-2 text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft size={16} /> Back to blogs
      </button>

      <article className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">{blog.title}</h1>

        <div className="flex items-center gap-6 text-gray-600 mb-8 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{blog.name || "Anonymous Doctor"}</span>
          </div>
          {blog.createdAt && (
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
        </div>

        <div className="prose max-w-none">
          {/* Split content by paragraphs for better formatting */}
          {blog.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed text-gray-700">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default ViewBlog;
