import React, { useState } from "react";
import { emojis } from "../../const";
import { useSendComment } from "../../redux/data/hooks/useSendComment";

interface Props {
  movieId: number;
}

const FilmDetailsCommentForm: React.FC<Props> = ({ movieId }): JSX.Element => {
  const [emoji, setEmoji] = useState(``);
  const [comment, setComment] = useState(``);

  const onEmojiClickHandler = (target: string) => () => {
    setEmoji(target);
  };

  const onCommentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const sendComment = useSendComment();
  const onSendCommentHandler = (evt: React.KeyboardEvent<HTMLFormElement>) => {
    if (evt.key === "Enter") {
      const data = {
        comment,
        emotion: emoji,
        date: new Date().toJSON(),
      };
      sendComment(movieId, data);
      evt.currentTarget.reset();
      setComment(``);
      setEmoji(``);
    }
  };
  return (
    <form
      className="film-details__new-comment"
      onKeyPress={onSendCommentHandler}
    >
      <div className="film-details__add-emoji-label">
        {emoji ? (
          <img
            src={`/images/emoji/${emoji}.png`}
            width="55"
            height="55"
            alt={`emoji-${emoji}`}
          />
        ) : (
          ``
        )}
      </div>

      <label className="film-details__comment-label">
        <textarea
          className="film-details__comment-input"
          placeholder="Select reaction below and write comment here"
          name="comment"
          onChange={onCommentChange}
        />
      </label>

      <div className="film-details__emoji-list">
        {emojis.map((emojiName) => (
          <label
            className="film-details__emoji-label"
            htmlFor={`emoji-${emojiName}`}
            onClick={onEmojiClickHandler(emojiName)}
          >
            <input
              className="film-details__emoji-item visually-hidden"
              name="comment-emoji"
              type="radio"
              value={`${emojiName}`}
              checked={emoji === emojiName}
            />
            <img
              src={`/images/emoji/${emojiName}.png`}
              width="30"
              height="30"
              alt="emoji"
            />
          </label>
        ))}
      </div>
    </form>
  );
};

export default FilmDetailsCommentForm;
