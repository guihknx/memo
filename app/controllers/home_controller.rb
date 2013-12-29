class HomeController < ApplicationController
  layout Proc.new { |controller| controller.request.xhr? ? false : 'application' }
  def addmemo
    @params = params[:memo]
    Memo.create( :memorie => @params[:memocontent], :desc => @params[:memodesc] )
    @data = Memo.order('memos.id DESC').find(:all)
  end
  def remove
    @id = params[:id]
    Memo.where(:id => @id.to_i).destroy_all
  end
end
