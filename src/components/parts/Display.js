import React from 'react';

const Display = ({
	children, 
	condition
}) => condition && <div>{children}</div>;

export default Display;