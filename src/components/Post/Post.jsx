import React from 'react';
import './post.css';
import { Chat, Heart, HeartFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Trash3 } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostFetch, switchLike } from '../../store/slices/postsSlice';

const Post = ({ post }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((s) => s.user);
    const { author, image, title, text, tags, likes, created_at, _id, comments } = post;
    const wasLiked = likes?.includes(user._id);

    const deletePost = (id) => {
        dispatch(deletePostFetch(id));
    };

    const handleLike = (_id, wasLiked) => {
        dispatch(switchLike({ _id, wasLiked }));
    };

    return (
        <div className='post'>
            {user._id === author._id && (
                <Trash3 className='post__trash' onClick={() => deletePost(post._id)} />
            )}
            <Link to={`/profile/${author._id}`}>
                <div className='post__header'>
                    <img
                        src={user._id === author._id ? user.avatar : author.avatar}
                        alt='avatar'
                        className='post__autor-avatar'
                    />
                    <div className='post__autor-info'>
                        <span className='post__autor-name'>
                            <b>{user._id === author._id ? user.name : author.name}</b>
                        </span>
                        <span className='post__autor-about'>
                            {user._id === author._id ? user.about : author.about}
                        </span>
                    </div>
                </div>
            </Link>
            <Link to={`/post/${_id}`} className='post__link'>
                <h3 className='post__title'>
                    {title.length >= 55 ? title.slice(0, 55) + '...' : title}
                </h3>
                <img src={image} alt='post' className='post__image' />
                <p className='post__text'>
                    {text.length >= 170 ? text.slice(0, 170) + '...' : text}
                </p>
            </Link>
            <div className='post__tags'>
                {!!tags.length &&
                    tags.map(
                        (tag, i) =>
                            tag.trim() !== '' && (
                                <span key={`${tag}+${i}`} className='post__tag'>
                                    {tag}
                                </span>
                            )
                    )}
            </div>
            <div className='post__footer'>
                <div className='post__buttons'>
                    <button className='post__button' onClick={() => handleLike(_id, wasLiked)}>
                        {wasLiked ? <HeartFill fill='red' /> : <Heart />}
                        <span className='post__like-count'>{!!likes.length && likes.length}</span>
                    </button>
                    <button className='post__button'>
                        <Chat />
                        <span className='post__comment-count'>
                            {!!comments.length && comments.length}
                        </span>
                    </button>
                </div>
                <span className='post__create-date'>
                    {new Date(created_at).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </span>
            </div>
        </div>
    );
};

export default Post;
