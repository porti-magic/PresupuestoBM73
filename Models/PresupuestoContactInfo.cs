namespace EstimadorBM.Models
{
	public class PresupuestoContactInfo
	{
		public int Id { get; set; }
		public string fname { get; set; }
		public string lname { get; set; }
		public string email { get; set; }
		public int phone { get; set; }
		public string address { get; set; }

        public PresupuestoContactInfo(int id, string fname, string lname, string email, int phone, string address)
        {
            Id = id;
			this.fname = fname;
			this.lname = lname;
			this.email = email;
			this.phone = phone;
			this.address = address;
        }
    }
}
