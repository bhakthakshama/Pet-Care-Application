package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Employee;
import com.example.demo.service.EmployeeService;

@CrossOrigin("*")
//@CrossOrigin(origins = "http://localhost:59912")
@RequestMapping("/api/employees")
@RestController

public class EmployeeController {

	private EmployeeService employeeService;

	public EmployeeController(EmployeeService employeeService) {
		super();
		this.employeeService = employeeService;
	}
	
	@PostMapping
	public ResponseEntity<Employee> saveEmployee(@RequestBody Employee employee){
	
		return new ResponseEntity<Employee>(employeeService.saveEmployee(employee),HttpStatus.CREATED);
	}
	
	@GetMapping
	public List<Employee> getAllEmployees(){
		return employeeService.getAllEmployees();
	}
	
	
//	@GetMapping("{id}")
//	public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") long employeeId)
//	{
//		return new ResponseEntity<Employee>(employeeService.getEmployeeById(employeeId),HttpStatus.OK);
//	}
	
	@PostMapping("/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable("id") long id, @RequestBody Employee employee)
	{
		return new ResponseEntity<Employee>(employeeService.updateEmployee(employee,id),HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Map<String, String>> deleteEmployee(@PathVariable("id") long id)
	{
		try {
			employeeService.deleteEmployee(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Details Deleted Successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
		}
		catch (Exception e) {
			Map<String, String> errorresponse = new HashMap<>();
			errorresponse.put("error", "Error deleting entity: " + e.getMessage());
            return new ResponseEntity<>(errorresponse, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
