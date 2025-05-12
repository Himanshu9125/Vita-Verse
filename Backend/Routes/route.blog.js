const express = require('express');

const routerBlog = express.Router();



const {
      getBlogByEmail,
      getAllBlogs,
      createBlog,
      getBlogsById,
      deleteBlog
} = require('../Controller/blog');


routerBlog.get('/all', getAllBlogs);
routerBlog.get('/:email', getBlogByEmail);
routerBlog.post('/createblog', createBlog);
routerBlog.post('/blog/:id', getBlogsById);
routerBlog.delete('/blog/:id', deleteBlog);

module.exports = routerBlog;