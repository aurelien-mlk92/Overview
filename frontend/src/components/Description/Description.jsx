import "./Description.css";

function Description({ data }) {
  // console.log( 'data', data)
  return (
    <div className="description_Component">
      <p>Description</p>
      <span>{data?.description}</span>
    </div>
  );
}
export default Description;
