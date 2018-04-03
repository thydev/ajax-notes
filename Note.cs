using System;
public class Note {
    public int Id {get; set;}
    public string Title {get;set;}
    public string Description {get; set;}
    public DateTime Created_at {get; set;}

    public Note() {
        // Created_at = DateTime.UtcNow;
        this.Created_at = DateTime.Now;
    }

    public Note(int Id, string Title, string Description, DateTime Created_at){
        this.Id = Id;
        this.Title = Title;
        this.Description = Description;
        this.Created_at = Created_at;
    }
}