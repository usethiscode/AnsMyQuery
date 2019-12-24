import React from 'react';

export const TagsInput = props => {
	const [tags, setTags] = React.useState(props.tags);
	const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
        props.selectedTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};
	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			props.selectedTags([...tags, event.target.value]);
			event.target.value = "";
		}
    };
    const closeStyles = {
        color: "black",
        display: "block",
        width: 16,
        height: 16,
        lineHeight: 1,
        color: "#0052cc",
		textAlign: "center",
		marginLeft: 15,
        borderRadius: 10,
        fontSize: 14,
        background: "#fff",
        cursor: "pointer"
    }

	return (
		<div>
			<ul id="tags">
				{tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon' style={closeStyles}
							onClick={() => removeTags(index)}
						>x  
						</span>
					</li>
				))}
			</ul>

				<div class="form-group">
                  
				  <input
						style={{ width:'50%'}}
						type="text"
						class="form-control"
						onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
						placeholder="Enter New Tags here"
					/>
                
                </div>

		</div>
	);
};