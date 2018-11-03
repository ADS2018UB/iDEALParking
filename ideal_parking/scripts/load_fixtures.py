import csv

from ideal_parking.models.parking_slot import ParkingSlot


def load_idealista_csv(file_path):
    """
    Load data from csv
    """
    ParkingSlot.drop_collection()
    with open(file_path, 'rt') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=',')
        for line in reader:
            if line.get('municipality') == 'Barcelona':
                surface = None
                price = 0
                price_by_area = 0

                try:
                    price = float(line['price'])
                    price_by_area = float(line['priceByArea'])

                    if price_by_area:
                        surface = price / price_by_area
                except ValueError:
                    pass

                ParkingSlot(
                    coordinates=(float(line['longitude']), float(line['latitude'])),
                    district=line['district'],
                    price=price,
                    size=line['detailedType.subTypology'],
                    address=line['address'],
                    surface=surface,
                ).save()
