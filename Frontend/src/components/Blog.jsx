import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const [blogs, setBlogs] = useState([]);

  const scrollByCard = (direction) => {
    const width = containerRef.current.offsetWidth;
    containerRef.current.scrollBy({
      left: direction === "right" ? width / 2 : -width / 2,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.children);
    const middle = container.scrollLeft + container.offsetWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - middle);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCenterIndex(closestIndex);
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/doctor/all`
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
    fetchBlogs();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      handleScroll(); // Run initially
      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [blogs]); // Re-run when blogs are loaded

  // Function to truncate text to a specific number of words
  const truncateText = (text, wordCount) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(" ") + "...";
  };

  // Navigate to the blog detail page
  const handleBlogClick = (blog) => {
    navigate(`/blog/${blog._id}`, { state: { blogData: blog } });
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Latest Blogs</h2>

      <button
        onClick={() => scrollByCard("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full hover:bg-gray-100"
        aria-label="Previous"
      >
        <ChevronLeft />
      </button>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-6 py-6 px-8 scroll-smooth hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {blogs.length > 0 ? (
          blogs.map((blog, idx) => (
            <div
              key={blog._id || idx}
              className={`transition-all duration-300 flex-shrink-0 w-72 h-80 rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg ${
                idx === centerIndex
                  ? "scale-110 z-10 bg-white border-2 border-blue-400"
                  : "scale-95 bg-blue-50"
              }`}
              onClick={() => handleBlogClick(blog)}
            >
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-2 text-blue-700">
                  {blog.title}
                </h3>
                <div className="flex-grow overflow-hidden">
                  <p className="text-sm text-gray-700 mb-4">
                    {truncateText(blog.content, 30)}
                  </p>
                </div>
                <div className="mt-auto pt-3 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-600">
                    By: {blog.name || "Anonymous Doctor"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-12 text-gray-500">
            No blogs available at the moment
          </div>
        )}
      </div>

      <button
        onClick={() => scrollByCard("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full hover:bg-gray-100"
        aria-label="Next"
      >
        <ChevronRight />
      </button>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Blogs;
