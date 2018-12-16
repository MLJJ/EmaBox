class CambiarColumnaFileNameForPosts < ActiveRecord::Migration[5.2]
  def change
    rename_column :documents, :FileName, :fileName
  end
end
