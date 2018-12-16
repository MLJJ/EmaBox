class RenamePostToDocument < ActiveRecord::Migration[5.2]
  def change
    rename_table :posts, :documents
  end
end
