import React from 'react';
import MultiSelect from "@khanacademy/react-multi-select";

const options = [
  {label: "One", value: "pythonhhh"},
  {label: "Two", value:"testtt"},
  {label: "Three", value: "Hellooo"},
];

export default class Consumer extends React.Component {
  state = {
    selected: [],
  }

  render() {
    const {selected} = this.state;

    return <MultiSelect
      options={options}
      selected={selected}
      onSelectedChanged={selected => this.props.selectedtags({selected})}
    />
  }
}