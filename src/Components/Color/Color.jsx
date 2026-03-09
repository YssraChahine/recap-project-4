import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({ color, onDelete, onUpdateColor }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <article
      className="color-card"
      style={{
        backgroundColor: color.hex,
        color: color.contrastText,
      }}
    >
      {isEditing ? (
        <ColorForm
          className="color-form color-form--inline"
          role={color.role}
          hex={color.hex}
          contrastText={color.contrastText}
          onSubmit={(updatedValues) => {
            onUpdateColor({
              id: color.id,
              ...updatedValues,
            });
            setIsEditing(false);
          }}
        />
      ) : (
        <>
          <span className="color-card__role">{color.role}</span>
          <span className="color-card__hex">{color.hex}</span>
          <span className="color-card__contrast">{color.contrastText}</span>

          {isConfirming ? (
            <div className="color-card-highlight">
              <p>Are you sure?</p>
              <button onClick={() => onDelete(color.id)}>Yes</button>
              <button onClick={() => setIsConfirming(false)}>Cancel</button>
            </div>
          ) : (
            <>
              <button onClick={() => setIsConfirming(true)}>Delete</button>
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </>
          )}
        </>
      )}
    </article>
  );
}