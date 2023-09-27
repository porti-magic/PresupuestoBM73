using System.Text.Json;

namespace EstimadorBM.Models
{
    public class Trago
    {
        public required int ID { get; set; }
        public required string Name { get; set; }
        public required bool IsAvailable { get; set; }

        public override string ToString() => JsonSerializer.Serialize(this);
    }
}
