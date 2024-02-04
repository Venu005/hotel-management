import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "5", label: "Last 5 days" },
        { value: "15", label: "Last 15 days" },
        { value: "30", label: "Last 30 days" },
      ]}
    />
  );
}

export default DashboardFilter;
