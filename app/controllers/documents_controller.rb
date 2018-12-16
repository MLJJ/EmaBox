class DocumentsController < ApplicationController
  before_action :authenticate_account!
  def create
    nameFile = params["fileName"].to_s
    if nameFile.blank?
      render js: "alertify.notify('No se puede subir un archivo sin nombre', 'warning', 3, function () {});"
    else
      numAccount = current_account
      @document = Document.new
      @document.account = numAccount
      file = params["file"]
      @document.fileName = nameFile
      if @document.correct_file nameFile, file
        if @document.save!
          render js: "alertify.notify('Se ha subido un documento', 'success', 3, function () {url = $(location).attr('href', '/');});"
        else
          render js: "alertify.notify('Ocurrio un error al tratar de subir el documento, se reiniciara la pagina', 'error', 3, function () {url = $(location).attr('href', '/');});"
        end
      else
        render js: "Solo se soporta documentos: Docx/Doc/PDF', 'error', 3, function () {url = $(location).attr('href', '/');});"
      end
    end
  end

  def show
    session[:conversations] ||= []

    @accounts = Account.all.where.not(id: current_account)
    @conversations = Conversation.includes(:recipient, :messages)
                         .find(session[:conversations])

    @document = Document.find(params[:id])
    if @document.file.content_type != "application/pdf" && @document.file.content_type != "application/msword"
      require "docx"
      @documentHtml = []
      active_storage_disk_service = ActiveStorage::Service::DiskService.new(root: Rails.root.to_s + '/storage/')
      doc = Docx::Document.open(active_storage_disk_service.send(:path_for, @document.file.blob.key))
      doc.paragraphs.each do |p|
        @documentHtml.push(p.to_html)
      end
    end
  end

  def saveDocument
    if params[:fileName] != '' && params[:documentContent] != ''
      numAccount = current_account
      html = params[:documentContent]
      html = '<html><head></head><body>'+ html + '</body></html>'
      file = Htmltoword::Document.create_and_save html, Rails.root.join('public','archivo.docx')
      @document = Document.new
      @document.account = numAccount
      @document.file.attach(io: File.open(file),
                            filename: params[:fileName],
                            content_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
      @document.file.content_type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      @document.fileName = params[:fileName] + '.docx'
      if @document.save!
        render js: "alertify.notify('Se ha guardado un documento', 'success', 3, function () {url = $(location).attr('href', '/');});"
      else
        render js: "alertify.notify('No se ha guardado el documento', 'warning', 3);"
      end
      file.close
    else
      render js: "alertify.notify('El nombre y el contenido del documento no puede estar vacio', 'warning', 3);"
    end
  end

  def new
    session[:conversations] ||= []

    @accounts = Account.all.where.not(id: current_account)
    @conversations = Conversation.includes(:recipient, :messages)
                         .find(session[:conversations])
  end
end
