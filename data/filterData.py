

import pandas as pd
filename = "oecd_tax_data.csv"
for_dataset = "oecd_tax_for.csv"
against_dataset = "oecd_tax_against.csv"
def main():
	df = pd.read_csv(filename);
	# query for average tax wedge data
	columns = ["FAM_TYPE","Household type", "Country","Year", "Value"]

	for_df = df.query('INDICATOR == "2_6" & FAM_TYPE=="MARRIED1" & Year==2021')[columns]

	against_df = df.query('INDICATOR == "2_6" & FAM_TYPE=="MARRIED1" & Year==2022')[columns]

	# write to csv
	for_df.to_csv(for_dataset);
	against_df.to_csv(against_dataset);


if __name__ == "__main__":
	main()
