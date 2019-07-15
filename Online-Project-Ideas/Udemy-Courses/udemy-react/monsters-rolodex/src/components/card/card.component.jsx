import React from 'react';

import './card.styles.css';

export const Card = props => (
<div className="card-container">
    <img src={`https://robohash.org/${props.monster.id}?set=set2&size=180x180`} alt={props.monster.name} />
    <h2> { `${props.monster.first_name} ${props.monster.last_name}` }</h2>
    <h3>{ props.monster.company_name }</h3>
    <p>Shirt Size: { props.monster.shirt_size }</p>
    <p>Donation amount: ${ props.monster.donation }</p>
    <p>Email: { props.monster.email }</p>
</div>
)
