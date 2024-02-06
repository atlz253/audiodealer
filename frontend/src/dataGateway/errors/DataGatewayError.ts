class DataGatewayError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataGatewayError";
  }
}

export default DataGatewayError;
