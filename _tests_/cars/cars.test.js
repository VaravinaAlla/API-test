const { CarsController } = require("../../src/controllers/CarsController");

const carsController = new CarsController();

describe("Check Cars API", () => {
  beforeAll(async () => {
    await carsController.login();
  });

  afterAll(async () => {
    const carsResponse = await carsController.getCars();
    const carIds = carsResponse.data.data.map((c) => c.id);
    for (const carId of carIds) {
      const res = await carsController.deleteCarById(carId);
    }
  });

  test("User can get all cars", async () => {
    const carsResponse = await carsController.getCars();
    expect(carsResponse.status).toBe(200);
  });

  test("User can create a new car brand Audi", async () => {
    let carsResponse = await carsController.getCars();
    const carList = [...carsResponse.data.data];
    for (let i = 1; i <= 5; i++) {
      const model = i;
      const newCarResponse = await carsController.createCar(1, model, 1020);
      carsResponse = await carsController.getCars();
      const newCarList = carsResponse.data.data;
      expect(newCarResponse.data.data.carBrandId).toBe(1);
      expect(newCarResponse.data.data.brand).toBe('Audi');
      expect(newCarResponse.data.data.carModelId).toBe(model);
      expect(
        newCarList.find(
          (car) => car.carModelId === newCarResponse.data.data.carModelId
        )
      ).toBeDefined();
      expect(
        newCarList.find(
          (car) => car.model === newCarResponse.data.data.model
        )
      ).toBeDefined();
     
    }
  });

   test("User can create a new car brand BMW", async () => {
     let carsResponse = await carsController.getCars();
     const carList = [...carsResponse.data.data];
     for (let i = 6; i <= 10; i++) {
       const model = i;
       const newCarResponse = await carsController.createCar(2, model, 10503);
       carsResponse = await carsController.getCars();
       const newCarList = carsResponse.data.data;
       expect(newCarResponse.data.data.carBrandId).toBe(2);
       expect(newCarResponse.data.data.brand).toBe("BMW");
       expect(newCarResponse.data.data.carModelId).toBe(model);
       expect(
         newCarList.find(
           (car) => car.carModelId === newCarResponse.data.data.carModelId
         )
       ).toBeDefined();
       expect(
         newCarList.find((car) => car.model === newCarResponse.data.data.model)
       ).toBeDefined();
     }
   });

   test("User can create a new car brand Ford", async () => {
     let carsResponse = await carsController.getCars();
     const carList = [...carsResponse.data.data];
     for (let i = 11; i <= 15; i++) {
       const model = i;
       const newCarResponse = await carsController.createCar(3, model, 10503);
       carsResponse = await carsController.getCars();
       const newCarList = carsResponse.data.data;
       expect(newCarResponse.data.data.carBrandId).toBe(3);
       expect(newCarResponse.data.data.brand).toBe("Ford");
       expect(newCarResponse.data.data.carModelId).toBe(model);
       expect(
         newCarList.find(
           (car) => car.carModelId === newCarResponse.data.data.carModelId
         )
       ).toBeDefined();
       expect(
         newCarList.find((car) => car.model === newCarResponse.data.data.model)
       ).toBeDefined();
     }
   });

   test("User can create a new car brand Porsche", async () => {
     let carsResponse = await carsController.getCars();
     const carList = [...carsResponse.data.data];
     for (let i = 16; i <= 18; i++) {
       const model = i;
       const newCarResponse = await carsController.createCar(4, model, 10503);
       carsResponse = await carsController.getCars();
       const newCarList = carsResponse.data.data;
       expect(newCarResponse.data.data.carBrandId).toBe(4);
       expect(newCarResponse.data.data.brand).toBe("Porsche");
       expect(newCarResponse.data.data.carModelId).toBe(model);
       expect(
         newCarList.find(
           (car) => car.carModelId === newCarResponse.data.data.carModelId
         )
       ).toBeDefined();
       expect(
         newCarList.find((car) => car.model === newCarResponse.data.data.model)
       ).toBeDefined();
     }
   });

   test("User can create a new car brand Fiat", async () => {
     let carsResponse = await carsController.getCars();
     const carList = [...carsResponse.data.data];
     for (let i = 19; i <= 23; i++) {
       const model = i;
       const newCarResponse = await carsController.createCar(5, model, 5503);
       carsResponse = await carsController.getCars();
       const newCarList = carsResponse.data.data;
       expect(newCarResponse.data.data.carBrandId).toBe(5);
       expect(newCarResponse.data.data.brand).toBe("Fiat");
       expect(newCarResponse.data.data.carModelId).toBe(model);
       expect(
         newCarList.find(
           (car) => car.carModelId === newCarResponse.data.data.carModelId
         )
       ).toBeDefined();
       expect(
         newCarList.find((car) => car.model === newCarResponse.data.data.model)
       ).toBeDefined();
     }
   });

   test ("400 status code when mileage is String", async () => {
     let carsResponse = await carsController.getCars();
     const carList = [...carsResponse.data.data];
       const newCarResponse = await carsController.createCar(1, 3, 'something');
       carsResponse = await carsController.getCars();
       expect(newCarResponse.status).toBe(400);
       expect(newCarResponse.data.message).toBe("Invalid mileage type");
       
   });

   test("404 status code when model car isn't match to the brand", async () => {
     let carsResponse = await carsController.getCars();
     const carList = [...carsResponse.data.data];
     const newCarResponse = await carsController.createCar(1, 15, 2036);
     carsResponse = await carsController.getCars();
     expect(newCarResponse.status).toBe(404);
     expect(newCarResponse.data.message).toBe("Model not found");
   });

   test("400 status code when mileage is more than max lenght", async () => {
     let carsResponse = await carsController.getCars();
     const carList = [...carsResponse.data.data];
     const newCarResponse = await carsController.createCar(1, 15, 20365656);
     carsResponse = await carsController.getCars();
     expect(newCarResponse.status).toBe(400);
     expect(newCarResponse.data.message).toBe(
       "Mileage has to be from 0 to 999999"
     );
   });

   test("400 status code when carModelId is String", async () => {
     let carsResponse = await carsController.getCars();
     const carList = [...carsResponse.data.data];
     const newCarResponse = await carsController.createCar(1, "model", 20365656);
     carsResponse = await carsController.getCars();
     expect(newCarResponse.status).toBe(400);
     expect(newCarResponse.data.message).toBe("Invalid car model type");
   });
});
