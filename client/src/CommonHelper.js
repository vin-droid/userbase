export function fieldChangeHandler (e)  { 
    const value = e.target.value === undefined ? e.target.checked : e.target.value;

    this.setState({
        [e.target.name]: value,
    });
}