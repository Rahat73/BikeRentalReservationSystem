const calculateRentalDuration = (startTime: Date, returnTime: Date) => {
  const differenceInMilliseconds = returnTime.getTime() - startTime.getTime();
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

  return differenceInHours;
};

export const rentalCost = (
  pricePerHour: number,
  startTime: Date,
  returnTimeTime: Date,
) => {
  const rentalDuration = calculateRentalDuration(startTime, returnTimeTime);

  return rentalDuration * pricePerHour;
};
