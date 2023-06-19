import React, { Component } from 'react';

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [
        { id: 1, name: 'Sakshi', location: 'Dewas', age: '23', email: 'sakshi@gmail.com' },
        { id: 2, name: 'Vaibhavi', location: 'Indore', age: '22', email: 'vaibhabi@gmail.com' },
        { id: 3, name: 'Hritika', location: 'Dhar', age: '23', email: 'hritika@gmail.com' },
      ],
      name: '',
      location: '',
      age: '',
      email: '',
      editingIndex: null,
    };
  }

  componentDidMount() {
    console.log('Component mounted');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component updated');
    console.log('Previous state:', prevState.employees);
    console.log('Current state:', this.state.employees);
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddEmployee = () => {
    const { employees, name, location, age, email } = this.state;
    const newEmployee = {
      id: Date.now(),
      name,
      location,
      age,
      email,
    };
    this.setState({
      employees: [...employees, newEmployee],
      name: '',
      location: '',
      age: '',
      email: '',
    });
  };

  handleEditEmployee = (index) => {
    const { employees } = this.state;
    const employeeToEdit = employees[index];
    this.setState({
      name: employeeToEdit.name,
      location: employeeToEdit.location,
      age: employeeToEdit.age,
      email: employeeToEdit.email,
      editingIndex: index,
    });
  };

  handleUpdateEmployee = () => {
    const { employees, name, location, age, email, editingIndex } = this.state;
    const updatedEmployee = { name, location, age, email };
    const updatedEmployees = [...employees];
    updatedEmployees[editingIndex] = updatedEmployee;
    this.setState({
      employees: updatedEmployees,
      name: '',
      location: '',
      age: '',
      email: '',
      editingIndex: null,
    });
  };

  handleDeleteEmployee = (index) => {
    const { employees } = this.state;
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    this.setState({ employees: updatedEmployees });
  };

 handleView = (index) =>{
  alert(`name:${index.name},location:${index.location},age:${index.age},email:${index.email}`)
 }

  render() {
    const { employees, name, location, age, email, editingIndex } = this.state;

    return (
      <div>
        <h2>Employees</h2>

        <form>
          <label>
            Name:
            <input type="text" name="name" value={name} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Location:
            <input type="text" name="location" value={location} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Age:
            <input type="text" name="age" value={age} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="text" name="email" value={email} onChange={this.handleInputChange} />
          </label>
          <br />

          {!editingIndex ? (
            <button type="button" onClick={this.handleAddEmployee}>
              Add Employee
            </button>
          ) : (
            <button type="button" onClick={this.handleUpdateEmployee}>
              Update Employee
            </button>
          )}
        </form>

        <h3>Employees:</h3>
        <table>
          <thead>
            <tr>

              <th>Name</th>
              <th>Location</th>
              <th>Age</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id}>

                <td>{employee.name}</td>
                <td>{employee.location}</td>
                <td>{employee.age}</td>
                <td>{employee.email}</td>
                <td>
                  <button type="button" onClick={() => this.handleEditEmployee(index)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => this.handleDeleteEmployee(index)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => this.handleView(employee)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Employee;
