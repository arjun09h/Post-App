import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdAdd } from "react-icons/md";
import axios from "axios";

const Feed = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:3000/posts"
                );

                setPosts(res.data.posts);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:3000/posts/${postId}`
            );

            setPosts((prev) =>
                prev.filter((post) => post._id !== postId)
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="feed-page">

            {/* Header */}
            <header className="feed-header">
                <div>
                    <p className="eyebrow">YOUR FEED</p>
                    <h1>Discover Posts</h1>
                    <p>Browse through the latest posts.</p>
                </div>

                <button
                    className="add-post-button"
                    onClick={() => navigate("/create-post")}
                >
                    <MdAdd />
                    Add Post
                </button>
            </header>

            {/* Posts */}
            <section className="posts-container">

                {loading ? (
                    <div className="empty-state">
                        <div className="loader"></div>
                        <p>Loading posts...</p>
                    </div>
                ) : posts.length > 0 ? (
                    posts.map((post) => (
                        <article
                            className="post-card"
                            key={post._id}
                        >
                            <div className="post-image-wrapper">
                                <img
                                    src={post.image}
                                    alt={post.caption || "Post"}
                                />
                            </div>

                            <div className="post-content">
                                <p>{post.caption}</p>

                                <button
                                    className="delete-button"
                                    onClick={() =>
                                        handleDelete(post._id)
                                    }
                                    aria-label="Delete post"
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">✦</div>

                        <h2>No posts yet</h2>

                        <p>
                            Be the first one to share something.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/create-post")
                            }
                        >
                            <MdAdd />
                            Create your first post
                        </button>
                    </div>
                )}

            </section>
        </main>
    );
};

export default Feed;