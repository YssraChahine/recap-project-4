import "./Color.css";


export default function Color({ color }) {
  return <article className="color-card" style={{backgroundColor:color.hex, color:color.contrastText}}>
    <span className="color-card__role">{color.role}</span>
    <span className="color-card__hex">{color.hex}</span>
    <span className="color-card__contrast">{color.contrastText}</span>
  </article>
}
