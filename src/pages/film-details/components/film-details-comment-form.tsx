import React, { useState } from "react";
import { emojis } from "../../../const";
import { useSendComment } from "../../../store/comment/hooks/useSendComment";
import {
  useFormBlockedStatus,
  useFormErrorStatus,
} from "../../../store/comment/hooks/selectors";

interface Props {
  movieId: number;
}

const shakeStyle = {
  boxShadow: `0px 0px 15px 0px rgba(245,32,32,1)`,
  animation: `shake 0.6s`,
} as React.CSSProperties;

const styles = {
  width: `100%`,
  height: `100%`,
  padding: `0`,
  display: `inherit`,
  minInlineSize: `auto`,
  alignItems: `inherit`,
  border: `none`,
} as React.CSSProperties;

export const FilmDetailsCommentForm: React.FC<Props> = ({
  movieId,
}): JSX.Element => {
  const [emoji, setEmoji] = useState(``);
  const [message, setComment] = useState(``);

  const isFormBlocked = useFormBlockedStatus();
  const isFormError = useFormErrorStatus();

  const sendComment = useSendComment();

  const onEmojiClickHandler = (target: string) => () => {
    setEmoji(target);
  };

  const onCommentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const onSendCommentHandler = async (
    evt: React.KeyboardEvent<HTMLFormElement>,
  ) => {
    if (evt.code === "Enter" && evt.ctrlKey) {
      const data = {
        message,
        emotion: emoji,
      };
      const { currentTarget } = evt;
      const result = await sendComment(movieId, data);
      if (result) {
        currentTarget.reset();
        setComment(``);
        setEmoji(``);
      }
    }
  };
  return (
    <form
      className="film-details__new-comment"
      onKeyPress={onSendCommentHandler}
      style={isFormError ? shakeStyle : {}}
    >
      <fieldset style={styles} disabled={isFormBlocked}>
        <div className="film-details__add-emoji-label">
          {emoji && (
            <img
              src={`/images/emoji/${emoji}.png`}
              width="55"
              height="55"
              alt={`emoji-${emoji}`}
            />
          )}
        </div>

        <label className="film-details__comment-label">
          <textarea
            className="film-details__comment-input"
            placeholder="Select reaction below and write comment here. Send it by Enter+Ctrl"
            name="comment"
            onChange={onCommentChange}
          />
        </label>

        <div className="film-details__emoji-list">
          {emojis.map((emojiName) => (
            <label
              key={emojiName}
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
                readOnly
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
      </fieldset>
    </form>
  );
};
