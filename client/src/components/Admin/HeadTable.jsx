export const HeadTable = () => {
  const thText = [
    "Image",
    "Title",
    "status",
    "media type",
    "Episodes",
    "Genres",
    "Synopsis",
    "Edit",
  ];
  return (
    <thead className="admin-panel__table-head">
      <tr className="admin-panel__table-row-header">
        {thText.map((item) => (
          <th key={item}>{item}</th>
        ))}
      </tr>
    </thead>
  );
};
