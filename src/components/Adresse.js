export default function Adresse(props) {
  const adresses = props.data;
  return (
    <div className="card-block">
      {adresses.map((adresse, i) => (
        <div className="card" key={i}>
          <div className="card-body">
            <h5 className="card-title">{adresse.properties.label}</h5>
            <ul className="card-text">
              <li>number: {adresse.properties.housenumber}</li>
              <li>street: {adresse.properties.street}</li>
              <li>city: {adresse.properties.city}</li>
              <li>zipcode: {adresse.properties.postcode}</li>
              <li>country: {adresse.properties.context}</li>
              <li>rounded score: {adresse.properties.score}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
