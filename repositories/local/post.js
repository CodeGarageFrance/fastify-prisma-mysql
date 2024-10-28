const posts = [
    {
        id: 1,
        title: 'Hello World',
        content: 'This is a post about Hello World',
    },
];

export const PostRepository = {
    getPosts: async (page, limit) => {
        return posts.slice((page - 1) * limit, page * limit);
    },
    getPost: async (id) => {
        const post =  posts.find(post => post.id === id);
        if(!post){
            throw new Error('Post not found');
        }
        return post;
    },
    createPost: async (post) => {
        const id = posts.length + 1;
        const newPost = { id, ...post };
        posts.push(newPost);
        return newPost;
    },
    updatePost: async (id, post) => {
        const oldpost = posts.find(post => post.id === id);
        if(!oldpost){
            throw new Error('Post not found');
        }
        const newPost = { id, ...oldpost, ...post };
        posts[index] = newPost;
        return newPost;
    },
    deletePost: async (id) => {
        const index = posts.findIndex(post => post.id === id);
        if(index === -1){
            throw new Error('Post not found');
        }
        const deleted = posts.splice(index, 1);
        return deleted;
    }
}