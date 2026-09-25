import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        try {
            await axios.post(
                "http://localhost:3000/create-post",
                formData
            );

            navigate("/feed");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="create-post-page">
            <div className="create-post-card">

                <button
                    className="back-button"
                    onClick={() => navigate("/feed")}
                >
                    ← Back to Feed
                </button>

                <div className="create-post-header">
                    <span className="header-icon">✦</span>

                    <div>
                        <p className="eyebrow">CREATE</p>
                        <h1>Create a Post</h1>
                        <p>
                            Share an image and tell everyone what's on your mind.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="create-post-form">

                    <label className="form-label">
                        Image
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            required
                        />
                    </label>

                    <label className="form-label">
                        Caption
                        <textarea
                            name="caption"
                            placeholder="Write your caption here..."
                            required
                        />
                    </label>

                    <button
                        type="submit"
                        className="publish-button"
                    >
                        Publish Post
                    </button>

                </form>
            </div>
        </main>
    );
};

export default CreatePost;