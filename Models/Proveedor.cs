namespace EstimadorBM.Models
{
	public class Proveedor
	{
        public int ID { get; set; }
		public string Nombre { get; set; }
        public int? Telefono { get; set; }
        public string? Mail { get; set; }
        public string LastUpdate { get; set; }

        public Proveedor(int ID, string Nombre, int? Telefono, string? Mail, string LastUpdate)
        {
            this.ID = ID;
            this.Nombre = Nombre; 
            this.Telefono = Telefono;
            this.Mail = Mail;
            this.LastUpdate = LastUpdate;
        }
    }
}
