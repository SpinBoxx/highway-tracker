import AddOrUpdateTravelForm from "@/components/forms/add-or-update-travel-form";

const AddTravelPage = () => {
	return (
		<div className="mt-6 space-y-6 px-4">
			<div className="space-y-3">
				<p className="h1 text-primary">Ajouter un trajet</p>
				<p className="text-muted-foreground">
					Veuillez renseigner tous les champs pour pouvoir ajouter ce trajet à
					votre historique.
				</p>
			</div>
			<div>
				<AddOrUpdateTravelForm />
			</div>
		</div>
	);
};

export default AddTravelPage;
