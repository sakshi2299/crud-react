import React, { Component } from 'react';
import Modal from 'react-modal';

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      name: '',
      email: '',
      editingIndex: null,
      selectedEmployee: null,
      isModalOpen: false,
    };
  }

  componentDidMount() {
    this.fetchEmployees();
  }

  fetchEmployees = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ employees: data });
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddEmployee = () => {
    const { name, email } = this.state;
    const newEmployee = {
      name,
      email,
    };

    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          employees: [...prevState.employees, data],
          name: '',
          email: '',
        }));
      })
      .catch((error) => {
        console.error('Error adding employee:', error);
      });
  };

  handleEditEmployee = (index) => {
    const { employees } = this.state;
    const employeeToEdit = employees[index];
    this.setState({
      name: employeeToEdit.name,
      email: employeeToEdit.email,
      editingIndex: index,
    });
  };

  handleUpdateEmployee = () => {
    const { employees, name, email, editingIndex } = this.state;
    const updatedEmployee = { name, email };
    const employeeId = employees[editingIndex].id;

    fetch(`https://jsonplaceholder.typicode.com/users/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEmployee),
    })
      .then((response) => {
        if (response.ok) {
          const updatedEmployees = [...employees];
          updatedEmployees[editingIndex] = updatedEmployee;
          this.setState({
            employees: updatedEmployees,
            name: '',
            email: '',
            editingIndex: null,
          });
        } else {
          throw new Error('Failed to update employee');
        }
      })
      .catch((error) => {
        console.error('Error updating employee:', error);
      });
  };

  handleDeleteEmployee = (index) => {
    const { employees } = this.state;
    const employeeId = employees[index].id;

    fetch(`https://jsonplaceholder.typicode.com/users/${employeeId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedEmployees = [...employees];
        updatedEmployees.splice(index, 1);
        this.setState({ employees: updatedEmployees });
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
      });
  };

  handleOpenModal = (employee) => {
    this.setState({ selectedEmployee: employee, isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { employees, name, email, editingIndex, selectedEmployee, isModalOpen } = this.state;

    const modalStyle = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '300px',
      },
    };

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
            Email:
            <input type="text" name="email" value={email} onChange={this.handleInputChange} />
          </label>
          <br />

          
          {editingIndex !== null ? (
            <button type="button" onClick={this.handleUpdateEmployee}>
              Update Employee
            </button>
          ) : (
            <button type="button" onClick={this.handleAddEmployee}>
              Add Employee
            </button>
          )}
        </form>

        <h3>Employees:</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
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
                  <button type="button" onClick={() => this.handleOpenModal(employee)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal isOpen={isModalOpen} style={modalStyle}>
          <h3>Details</h3>
          {selectedEmployee && (
            <div>
              <p>Name: {selectedEmployee.name}</p>
              <p>Email: {selectedEmployee.email}</p>
            </div>
          )}
          <button onClick={this.handleCloseModal}>Close</button>
        </Modal>
      </div>
    );
  }
}

export default Employee;
