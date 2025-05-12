const Blog = require('../Model/model.blog');

const createBlog = async (req, res) => {
    try {
        const { title, email, content, name } = req.body;

        // Check required fields
        if (!name || !email || !content || !title) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if blog with same title already exists
        const existingBlog = await Blog.findOne({ title });
        if (existingBlog) {
            return res.status(400).json({ message: 'Title already taken' });
        }

        // Create and save
        const newBlog = new Blog({ title, email, content, name });
        const savedBlog = await newBlog.save();

        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({
            message: 'Error creating blog',
            error: error.message,
        });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getBlogByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const blogs = await Blog.find({ email });
        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: 'No blogs found for this email' });
        }

        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
const getBlogsById = async (req, res) => {
    try {
        const { id } = req.params;

        const blogs = await Blog.findOne({ id });
        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: 'No blogs found for this email' });
        }

        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogByEmail,
    getBlogsById,
    deleteBlog
};
