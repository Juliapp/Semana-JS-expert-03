import chalk from 'chalk';
import chalkTable from 'chalk-table';
export default class TableConsoleComponent {
  render(data) {
    const columns = this.preparedData(data);

    const options = {
      leftPad: 2,
      columns,
    };

    const table = chalkTable(options, data);
    console.log(table);
  }

  preparedData(data) {
    const [firstItem] = data;
    const headers = Object.keys(firstItem);

    const formatHeader = (data, index) =>
      index % 2 === 0 ? chalk.yellow(data) : chalk.green(data);

    const columns = headers.map((item, index) => ({
      field: item,
      name: formatHeader(item, index),
    }));

    return columns;
  }
}
