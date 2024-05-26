<template>
  <div class="min-h-screen w-full">
    <Dashboard />
    <div class="container mx-auto">
      <h1 class="my-8 text-3xl">Workers list:</h1>
      <button @click="addEmployee" class="mb-4">Add Employee</button>
      <ul class="flex flex-col gap-y-2">
        <li
          v-for="employee in employees"
          :key="employee.id"
          class="flex items-center gap-x-2"
        >
          <input
            v-model="employee.name"
            placeholder="Name"
            type="text"
            class="input"
          />
          <input
            v-model="employee.surname"
            placeholder="Surname"
            type="text"
            class="input"
          />
          <input
            v-model="employee.position"
            placeholder="Position"
            type="text"
            class="input"
          />
          <input
            v-model="employee.salary"
            placeholder="Salary"
            type="number"
            class="input"
          />
          <button @click="saveEmployee(employee)">Save</button>
          <button @click="deleteEmployee(employee.id)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../../supabase";
import Dashboard from "./Dashboard.vue";

const employees = ref([]);

const fetchEmployees = async () => {
  const { data, error } = await supabase.from("employeeTable").select("*");

  if (error) {
    console.error("Error fetching employees:", error.message);
  } else {
    employees.value = data;
  }
};

const saveEmployee = async (employee) => {
  const { error } = await supabase
    .from("employeeTable")
    .update({
      name: employee.name,
      surname: employee.surname,
      position: employee.position,
      salary: employee.salary,
    })
    .eq("id", employee.id);

  if (error) {
    console.error("Error updating employee:", error.message);
  }
};

const deleteEmployee = async (id) => {
  const { error } = await supabase.from("employeeTable").delete().eq("id", id);

  if (error) {
    console.error("Error deleting employee:", error.message);
  } else {
    fetchEmployees();
  }
};

const addEmployee = async () => {
  const { data, error } = await supabase.from("employeeTable").insert([
    {
      name: "New Employee",
      surname: "New Surname",
      position: "New Position",
      salary: 0,
    },
  ]);

  if (error) {
    console.error("Error adding employee:", error.message);
  } else if (data && data.length > 0) {
    employees.value.push(data[0]);
    fetchEmployees();
  }
};

onMounted(fetchEmployees);
</script>
